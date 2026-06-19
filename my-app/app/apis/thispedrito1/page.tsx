"use client";

import { useEffect, useState } from "react";
import FavoriteButton from "@/app/components/FavoriteButton";
import { useFavorites } from "@/app/context/FavoritesContext";

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
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

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
                    {products.map((product) => {
                        const favoriteKey = `ecommerce-${product.id}`;
                        const active = isFavorite(favoriteKey);

                        const handleFavorite = () => {
                            if (active) {
                                removeFavorite(favoriteKey);
                                return;
                            }

                            addFavorite({
                                key: favoriteKey,
                                id: product.id,
                                title: product.title,
                                subtitle: product.category,
                                image: product.img,
                                category: "ecommerce",
                            });
                        };

                        return (
                        <article key={product.id} className="relative rounded border border-zinc-200 p-3">
                            <div className="absolute right-2 top-2 z-10 rounded-full bg-white/90">
                                <FavoriteButton
                                    active={active}
                                    onClick={handleFavorite}
                                    label={active ? "Quitar de favoritos" : "Agregar a favoritos"}
                                />
                            </div>
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
                        );
                    })}
                </section>
            )}
        </main>
    );
}