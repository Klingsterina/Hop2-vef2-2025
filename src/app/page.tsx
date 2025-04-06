import Link from 'next/link';
import Banner from '../components/Banner/Banner';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

export default function Home() {
  const isLoggedIn = true;
  const username = 'User name';

  return (
    <main>
      <Banner isLoggedIn={isLoggedIn} username={username} />
      <Header />
      <div>
        <h1>Forsíða</h1>
        <Link href="/champions">champions</Link>
        <Link href="/items">Items</Link>
      </div>
      <Footer />
    </main>
  );
}
