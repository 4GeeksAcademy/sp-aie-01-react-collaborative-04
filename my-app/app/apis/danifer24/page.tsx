"use client"

import { useState, useEffect } from "react";
import FavoriteButton from "@/app/components/FavoriteButton";
import { useFavorites } from "@/app/context/FavoritesContext";

interface Product {
    id: number;
    image: string;
    name: string;
    category: string;
    price: number;
}

export default function FastFoodPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetch('https://devsapihub.com/api-fast-food');
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                const data: Product[] = await response.json();
                setProducts(data);
            } catch (error) {
                console.log(error);
            }
        };

        getProducts();
    }, []);

    return (
        <div className="min-h-screen bg-white font-sans">
            <div className="mx-auto max-w-7xl px-6 py-10">
                <h1 className="mb-10 text-center text-3xl font-bold tracking-tight text-black">Comidas</h1>

                <div className="flex flex-wrap justify-center gap-6">
                    {products.map((product) => {
                        const favoriteKey = `comida-${product.id}`;
                        const active = isFavorite(favoriteKey);

                        const handleFavorite = () => {
                            if (active) {
                                removeFavorite(favoriteKey);
                                return;
                            }

                            addFavorite({
                                key: favoriteKey,
                                id: product.id,
                                title: product.name,
                                subtitle: product.category,
                                image: product.image,
                                category: "comida",
                            });
                        };

                        return (
                        <article
                            key={product.id}
                            className="relative w-full max-w-xs overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-sm transition hover:-translate-y-1 hover:border-gray-300 hover:shadow-md"
                        >
                            <div className="absolute right-2 top-2 z-10 rounded-full bg-white/90">
                                <FavoriteButton
                                    active={active}
                                    onClick={handleFavorite}
                                    label={active ? "Quitar de favoritos" : "Agregar a favoritos"}
                                />
                            </div>

                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-52 w-full object-cover"
                            />

                            <div className="space-y-2 p-4">
                                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                                <p className="text-sm text-gray-700">
                                    <strong>Categoria:</strong> {product.category}
                                </p>
                                <p className="text-base font-medium text-gray-900">
                                    <strong>Precio:</strong> ${product.price.toFixed(2)}
                                </p>
                            </div>
                        </article>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}