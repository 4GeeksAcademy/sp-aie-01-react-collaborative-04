"use client";

import { useEffect, useState } from "react";
import FavoriteButton from "@/app/components/FavoriteButton";
import { useFavorites } from "@/app/context/FavoritesContext";

interface Movie {
	id: number;
	title: string;
	description: string;
	year: number;
	image_url: string;
	genre: string;
	stars: number;
}

export default function MoviesPage() {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { addFavorite, removeFavorite, isFavorite } = useFavorites();

	useEffect(() => {
		const getMovies = async () => {
			try {
				setLoading(true);
				setError(null);

				const response = await fetch("https://devsapihub.com/api-movies");
				if (!response.ok) {
					throw new Error(`Error HTTP: ${response.status}`);
				}

				const data: Movie[] = await response.json();
				setMovies(data);
			} catch {
				setError("No se pudieron cargar las peliculas");
			} finally {
				setLoading(false);
			}
		};

		getMovies();
	}, []);

	return (
		<main className="mx-auto w-full max-w-7xl px-6 py-10">
			<h1 className="mb-8 text-center text-3xl font-bold">Peliculas</h1>

			{loading && <p>Cargando peliculas...</p>}
			{!loading && error && <p className="text-red-500">{error}</p>}

			{!loading && !error && (
				<section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{movies.map((movie) => {
						const favoriteKey = `peliculas-${movie.id}`;
						const active = isFavorite(favoriteKey);

						const handleFavorite = () => {
							if (active) {
								removeFavorite(favoriteKey);
								return;
							}

							addFavorite({
								key: favoriteKey,
								id: movie.id,
								title: movie.title,
								subtitle: `${movie.genre} - ${movie.year}`,
								image: movie.image_url,
								category: "peliculas",
							});
						};

						return (
							<article key={movie.id} className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
								<div className="absolute right-2 top-2 z-10 rounded-full bg-white/90">
									<FavoriteButton
										active={active}
										onClick={handleFavorite}
										label={active ? "Quitar de favoritos" : "Agregar a favoritos"}
									/>
								</div>

								<img src={movie.image_url} alt={movie.title} className="h-52 w-full object-cover" />

								<div className="space-y-2 p-4 text-black">
									<h2 className="text-lg font-semibold">{movie.title}</h2>
									<p className="text-sm text-gray-700">{movie.genre} - {movie.year}</p>
									<p className="text-sm text-gray-600">{movie.description}</p>
								</div>
							</article>
						);
					})}
				</section>
			)}
		</main>
	);
}
