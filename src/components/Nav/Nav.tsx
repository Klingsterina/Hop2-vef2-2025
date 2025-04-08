'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../../Styles/page.module.scss';

export default function Nav() {
    const pathname = usePathname();

    return (
        <nav className={styles.nav}>
            <ol>
                <li className={pathname === '/' ? styles.active : ''}><Link href="/" >Forsíða</Link></li>
                <li className={pathname === '/champions' ? styles.active : ''}><Link href="/champions" >Champions</Link></li>
                <li className={pathname === '/items' ? styles.active : ''}><Link href="/items">Items</Link></li>
            </ol>
        </nav>
    );
}
