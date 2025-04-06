'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Api } from '../../../api';
import { ItemResponse } from '@/types/items';
import Link from 'next/link';
import Header from '@/components/Header/Header';
import Banner from '@/components/Banner/Banner';
import styles from '../../../Styles/page.module.scss';

export default function ItemsIdPage() {
  const isLoggedIn = true;
  const username = 'User name';
  const { id } = useParams();
  const api = new Api();
  const [item, setItem] = useState<ItemResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchItemById = async () => {
      setLoading(true);
      setError(false);

      try {
        const result = await api.getItemById(id as string);
        if (result) {
          setItem(result);
        } else {
          setError(true);
        }
      } catch (e) {
        console.error('Error loading items:', e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchItemById();
    }
  }, [id]);

  if (loading) return <div className={styles.center}>Loading...</div>;
  if (error || !item) return <div className={styles.center}>Error loading items</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <Banner isLoggedIn={isLoggedIn} username={username} />
      <Header />
      
      <Link href="/items">Til baka</Link>
      <h1>{item.name}</h1>
      <p dangerouslySetInnerHTML={{ __html: item.description}}></p>
      <Image src={item.imageUrl} alt={item.name} width={500} height={500} />
    </div>
  );
}
