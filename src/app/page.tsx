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
        <br />
      </div>
      <Footer />
    </main>
  );
}
