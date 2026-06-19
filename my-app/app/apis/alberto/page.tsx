"use client";
import { useEffect, useState } from "react";
import FavoriteButton from "@/app/components/FavoriteButton";
import { useFavorites } from "@/app/context/FavoritesContext";

interface Player {
    id: number;
    img_src: string;
    name: string;
    team_name: string;
}

export default function PlayersPage() {
    const [players, setPlayers] = useState<Player[]>([])
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    const urlapi = "https://devsapihub.com/api-players"

    useEffect(() => {
        const getPlayers = async () => {
            const response = await fetch(urlapi)
            if (!response.ok) {
                console.log(`Código de error: ${response.status}`)
                return
            }
            const data = await response.json()
            setPlayers(data)
        }

        void getPlayers();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {players.map((item) => {
                const favoriteKey = `nba-${item.id}`;
                const active = isFavorite(favoriteKey);

                const handleFavorite = () => {
                    if (active) {
                        removeFavorite(favoriteKey);
                        return;
                    }

                    addFavorite({
                        key: favoriteKey,
                        id: item.id,
                        title: item.name,
                        subtitle: item.team_name,
                        image: item.img_src,
                        category: "nba",
                    });
                };

                return (
                <div key={item.id} className="relative max-w-sm rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200">
                    <div className="absolute right-2 top-2 z-10 rounded-full bg-white/90">
                        <FavoriteButton
                            active={active}
                            onClick={handleFavorite}
                            label={active ? "Quitar de favoritos" : "Agregar a favoritos"}
                        />
                    </div>
                    {/* Imagen de la Card */}
                    <img
                        className="w-full h-48 object-cover"
                        src= {item.img_src}
                        alt="Card cap"
                    />

                    {/* Contenido de texto */}
                    <div className="p-5">
                        <h3 className="font-bold text-xl mb-2 text-gray-800">{item.name}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">Equipo: {item.team_name}</p>
                    </div>
                </div>
                );
            })}

        </div>
    );

}

