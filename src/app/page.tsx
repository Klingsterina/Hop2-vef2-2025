'use client';

import Banner from '../components/Banner/Banner';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
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
      <Banner isLoggedIn={isLoggedIn} username={username} />
      <Header />
      <div>
        <br />
      </div>
      <Footer />
    </main>
  );
}
