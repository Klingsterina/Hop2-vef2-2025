import Link from 'next/link';
import styles from '../../Styles/page.module.scss';

export default function Nav() {
    return (
        <nav className={styles.nav}>
            <ol>
                <li><Link href="/">Forsíða</Link></li>
                <li><Link href="/champions">Champions</Link></li>
                <li><Link href="/items">Items</Link></li>
                {/* <li><Link href="">Runes</Link></li>
                <li><Link href="">Summoner Spells</Link></li> */}
            </ol>
        </nav>
    );
}

/** Geyma */
{/* <Link href={`/champions/${champion.slug}`}>Champions</Link> */}
