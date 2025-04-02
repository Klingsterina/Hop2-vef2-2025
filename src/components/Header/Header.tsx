import styles from '../../Styles/page.module.scss';
import Nav from '../Nav/Nav';

export default function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Hópverkefni 2</h1>
            <Nav />
        </header>
    );
}