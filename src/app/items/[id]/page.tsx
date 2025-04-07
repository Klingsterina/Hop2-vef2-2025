'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Api } from '../../../api';
import { ItemResponse } from '@/types/items';
import Link from 'next/link';
import styles from '../../../Styles/page.module.scss';

export default function ItemsIdPage() {
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

  if (loading) return <div className={styles.center} style={{padding: '1rem'}}>Loading...</div>;
  if (error || !item) return <div className={styles.center} style={{padding: '1rem'}}>Error loading items</div>;

  return (
    <div style={{alignItems: 'center'}}>
      <h1 className={`${styles.title} ${styles.center}`}>{item.name}</h1>
      <div className={styles.details_container} style={{ padding: '2rem' }}>    
        <p dangerouslySetInnerHTML={{ __html: item.description}}></p>
        <div className={styles.imageWrapper}>
          <Image src={item.imageUrl} alt={item.name} fill />
        </div>
        <Link className={styles.link} style={{marginTop: '4rem'}} href="/items">Til baka</Link>
      </div>
    </div>
  );
}
