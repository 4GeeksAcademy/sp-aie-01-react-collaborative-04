"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    img: string;
};

export default function App() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const resp = await fetch("https://devsapihub.com/api-ecommerce");
                const data: Product[] = await resp.json();

                setProducts(data);
            } catch (error) {
                console.error(error);
                setError("No se pudieron cargar los productos");
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, []);

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-8">
            <h1 className="mb-2 text-3xl font-bold">API Ecommerce</h1>

            {loading && (
                <div className="rounded-xl border border-zinc-300 bg-zinc-50 p-4 text-zinc-700">
                    Cargando productos...
                </div>
            )}

            {!loading && error && (
                <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((product) => (
                        <article key={product.id}>
                            <img
                                src={product.img}
                                alt={product.title}
                                width={600}
                                height={400}
                            />
                            <div>
                                <span>{product.category}</span>
                                <h2>{product.title}</h2>
                                <p>{product.description}</p>
                                <p>{product.price}</p>
                            </div>
                        </article>
                    ))}
                </section>
            )}
        </main>
    );
}