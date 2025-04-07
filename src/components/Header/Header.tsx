import styles from '../../Styles/page.module.scss';
import Banner from '../Banner/Banner';
import Nav from '../Nav/Nav';

export default function Header() {
    return (
        <header className={styles.header}>
            <Banner isLoggedIn={true} username="User name" />
            <div className={styles.container}>
                <h1 className={styles.title}>Hópverkefni 2</h1>
                <Nav />
            </div>
        </header>
    );
}