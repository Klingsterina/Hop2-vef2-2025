import styles from '../../Styles/page.module.scss';

export default function Nav() {
    return (
        <nav className={styles.nav}>
            <ol>
                <li>Forsíða</li>
                <li>Champions</li>
                <li>Items</li>
                <li>Runes</li>
                <li>Summoner Spells</li>
            </ol>
        </nav>
    );
}

/** Geyma */
{/* <Link href={`/champions/${champion.slug}`}>Champions</Link> */}
