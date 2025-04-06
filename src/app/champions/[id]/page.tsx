'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Api } from '../../../api';
import { ChampionResponse } from '@/types/champion';
import Link from 'next/link';
import Header from '@/components/Header/Header';
import Banner from '@/components/Banner/Banner';
import styles from '../../../Styles/page.module.scss';

export default function ChampionIdPage() {
  const isLoggedIn = true;
  const username = 'User name';
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

  if (loading) return <div className={styles.center}>Loading...</div>;
  if (error || !champion) return <div className={styles.center}>Error loading champion</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <Header />
      <Banner isLoggedIn={isLoggedIn} username={username} />
      
      <Link href="/champions">Til baka</Link>
      <h1>{champion.name}</h1>
      <p>{champion.title}</p>
      <Image src={champion.imageUrl} alt={champion.name} width={500} height={500} />
    </div>
  );
}
