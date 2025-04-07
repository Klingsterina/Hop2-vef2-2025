'use client';
import Link from 'next/link';
import styles from '../Styles/page.module.scss';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }

    const userData = localStorage.getItem('user');
    if (userData) {
      const userObj = JSON.parse(userData);
      setUsername(userObj.username || '');
      setProfilePic(userObj.profilePicture || '');
    }
  }, []);

  return (
    <main>
      <div className={styles.frontpage}>
        <h1 className={`${styles.center} ${styles.title}`}>Forsíða</h1>
        <div className={styles.linkWrapper}>
          <Link className={styles.link} href="/champions">See all champions</Link>
          <Link className={styles.link} href="/items">See all items</Link>
        </div>
      </div>
    </main>
  );
}
