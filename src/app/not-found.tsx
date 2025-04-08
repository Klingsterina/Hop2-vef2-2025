'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../Styles/page.module.scss';

export default function NotFoundPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);
  const [dots, setDots] = useState('');

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push('/');
    }, 10000);

    const countdownInterval = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    const dotInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 1000);

    return () => {
      clearTimeout(redirectTimer);
      clearInterval(countdownInterval);
      clearInterval(dotInterval);
    };
  }, [router]);

  return (
    <div className={styles.notFoundPage}>
      <h1>404</h1>
      <h2>Not found</h2>
      <p className={styles.redirect}>You will be redirected to front page in: {countdown} sec{dots}</p>
    </div>
  );
}
