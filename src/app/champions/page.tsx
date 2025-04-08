'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Api } from '../../api';
import { ChampionResponse, PaginatedChampionResponse } from '@/types/champion';
import styles from '../../Styles/page.module.scss';
import { notFound } from 'next/navigation';


export default function ChampionsPage() {
  const api = new Api();
  const [champions, setChampions] = useState<ChampionResponse[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchChampions = async () => {
      setLoading(true);
      setError(false);

      try {
        const result: PaginatedChampionResponse | null = await api.getChampions(page, 20);
        if (result) {
          setChampions(result.data);
          setTotalPages(result.pagination.pages);
        } else {
          setError(true);
        }
      } catch (e) {
        console.error('Error loading champions:', e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchChampions();
  }, [page]);

  if (loading) return <div className={styles.center} style={{padding: '1rem'}}>Loading...</div>;
  if (error) return <div className={styles.center} style={{padding: '1rem'}}>Error loading champions</div>;
  if (champions.length === 0) return notFound();

  return (
    <div>
      <h1 className={`${styles.center} ${styles.title}`} style={{marginTop: '2rem'}}>Champions</h1>
      <ul className={styles.cards}>
        {champions.map((champ) => (
          <li className={`${styles.card} ${styles.col_n}`} key={champ.id}>
            <p>{champ.name}</p>
            <div className={styles.imageWrapper}>
              <Link href={`/champions/${champ.id}`}><Image src={champ.imageUrl} alt={champ.name} fill /></Link>
            </div>
            </li>
        ))}
      </ul>

      <div className={styles.center} style={{ marginTop: '2rem', marginBottom: '2rem'  }}>
        <button
          className={`${styles.button} ${page <= 1 ? styles.disabled : ''}`}
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          >Fyrri
        </button>
        <span style={{ margin: '0 1rem' }}>
          Page {page} of {totalPages}
        </span>
        <button
          className={`${styles.button} ${page >= totalPages ? styles.disabled : ''}`}
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
          >Næsta
        </button>
      </div>
    </div>
  );
}
