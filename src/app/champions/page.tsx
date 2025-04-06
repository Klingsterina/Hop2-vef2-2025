'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Api } from '../../api';
import { ChampionResponse, PaginatedChampionResponse } from '@/types/champion';
import Header from '../../components/Header/Header';
import Banner from '@/components/Banner/Banner';
import styles from '../../Styles/page.module.scss';


export default function ChampionsPage() {
  const isLoggedIn = true;
  const username = 'User name';
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

  if (loading) return <div className={styles.center}>Loading...</div>;
  if (error) return <div className={styles.center}>Error loading champions</div>;
  if (champions.length === 0) return <div className={styles.center}>No champions found</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <Banner isLoggedIn={isLoggedIn} username={username} />
      <Header />
      <h1>Champions</h1>
      <ul>
        {champions.map((champ) => (
          <li key={champ.id}>
            <Link href={`/champions/${champ.id}`}>{champ.name}</Link>
            <Image src={champ.imageUrl} alt={champ.name} width={64} height={64} />
            </li>
        ))}
      </ul>

      <div style={{ marginTop: '2rem' }}>
        <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
          Previous
        </button>
        <span style={{ margin: '0 1rem' }}>
          Page {page} of {totalPages}
        </span>
        <button onClick={() => setPage(page + 1)} disabled={page >= totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
