'use client';

import { Api } from "@/api";
import { ItemResponse, PaginatedItemResponse } from "@/types/items";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../Styles/page.module.scss";
import { notFound } from "next/navigation";

export default function Items() {
    const api = new Api();
    const [items, setItems] = useState<ItemResponse[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            setError(false);

            try {
                const result: PaginatedItemResponse | null = await api.getItems(page, 20);
                if (result) {
                    setItems(result.data);
                    setTotalPages(result.pagination.pages);
                } else {
                    setError(true);
                }
            } catch (e) {
                console.error('Error loading items:', e);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, [page]);

    if (loading) return <div className={styles.center} style={{padding: '1rem'}}>Loading...</div>;
    if (error) return <div className={styles.center} style={{padding: '1rem'}}>Error loading items</div>;
    if (items.length === 0) return notFound();

    return (
        <div>
            <h1 className={`${styles.center} ${styles.title}`} style={{marginTop: '2rem'}}>Items</h1>
            <ul className={styles.cards}>
                {items.map((item) => (
                    <li className={`${styles.card} ${styles.col_n}`} key={item.id}>
                        <p>{item.name}</p>
                        <div className={styles.imageWrapper}>
                            <Link href={`/items/${item.id}`}><Image src={item.imageUrl} alt={item.name} fill /></Link>
                        </div>
                    </li>
                ))}
            </ul>

            <div className={styles.center} style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            <button
                className={`${styles.button} ${page <= 1 ? styles.disabled : ''}`}
                onClick={() => setPage(page - 1)}
                disabled={page <= 1}
                >Fyrri
            </button>
            <span style={{ margin: '0 1rem' }}>
                Page {page} of {totalPages}
            </span>
            <button
                className={`${styles.button} ${page >= totalPages ? styles.disabled : ''}`}
                onClick={() => setPage(page + 1)}
                disabled={page >= totalPages}
                >Næsta
            </button>
            </div>
        </div>
    );
}