'use client';

import { Api } from "@/api";
import { ItemResponse, PaginatedItemResponse } from "@/types/items";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/Header/Header";
import Banner from "@/components/Banner/Banner";
import styles from "../../Styles/page.module.scss";

export default function Items() {
    const isLoggedIn = true;
    const username = 'User name';
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

    if (loading) return <div className={styles.center}>Loading...</div>;
    if (error) return <div className={styles.center}>Error loading items</div>;
    if (items.length === 0) return <div className={styles.center}>No items found</div>;

    return (
        <div>
            <Banner isLoggedIn={isLoggedIn} username={username} />
            <Header />
            <h1>Items</h1>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <Link href={`/items/${item.id}`}>{item.name}</Link>
                        <Image src={item.imageUrl} alt={item.name} width={64} height={64} />
                    </li>
                ))}
            </ul>

            <div style={{ marginTop: '2rem' }}>
                <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
                    Previous
                </button>
                <span style={{ margin: '0 1rem' }}>
                    Page {page} of {totalPages}
                </span>
                <button onClick={() => setPage(page + 1)} disabled={page >= totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}