"use client";
import { useEffect, useState } from "react";


export default function PlayersPage() {
    const [players, setPlayers] = useState([])

    const urlapi = "https://devsapihub.com/api-players"
    const getPlayers = async () => {
        const response = await fetch(urlapi)
        if (!response.ok) {
            console.log(`Código de error: ${response.status}`)
            return
        }
        const data = await response.json()
        console.log(data)
        setPlayers(data)
    }

    useEffect(() => {
        console.log("Se ejecuta solo al montar el componente");
        getPlayers();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {players.map((item, index) => 
                <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200">
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
            

            )}

        </div>
    );

}

