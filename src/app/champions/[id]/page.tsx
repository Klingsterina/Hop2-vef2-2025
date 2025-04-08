'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { Api } from '../../../api';
import { ChampionResponse } from '@/types/champion';
import Link from 'next/link';
import styles from '../../../Styles/page.module.scss';

export default function ChampionIdPage() {
  const { id } = useParams();
  const api = new Api();
  const [champion, setChampion] = useState<ChampionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchChampionById = async () => {
      setLoading(true);
      setError(false);

      try {
        const result = await api.getChampionById(id as string);
        if (result) {
          setChampion(result);
        } else {
          setError(true);
        }
      } catch (e) {
        console.error('Error loading champion:', e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchChampionById();
    }
  }, [id]);

  if (loading) return <div className={styles.center} style={{padding: '1rem'}}>Loading...</div>;
  if (error || !champion) return notFound();

  return (
    <div style={{alignItems: 'center'}}>
      <h1 className={`${styles.title} ${styles.center}`}>{champion.name}</h1>
      <div className={styles.details_container} style={{ padding: '2rem' }}>     
        <p>{champion.title}</p>
        <div className={styles.imageWrapper}>
          <Image src={champion.imageUrl} alt={champion.name} fill />
        </div>
        <Link className={styles.link} style={{marginTop: '4rem'}} href="/champions">Til baka</Link>
      </div>
    </div>
  );
}
