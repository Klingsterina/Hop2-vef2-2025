import styles from '../Styles/page.module.scss';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <div>
        <h1 className={styles.title}>Hópverkefni 2</h1>
      </div>
      <p>Hallo</p>
      <Footer />
    </main>
  );
}
