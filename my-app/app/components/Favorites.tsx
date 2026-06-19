"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { FavoriteItem, FavoritesCategory, useFavorites } from "../context/FavoritesContext";

const sections: { key: FavoritesCategory; label: string }[] = [
  { key: "ecommerce", label: "Ecommerce" },
  { key: "nba", label: "Jugadores NBA" },
  { key: "comida", label: "Comida" },
  { key: "peliculas", label: "Peliculas" },
];

export default function Favorites() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { favorites, removeFavorite } = useFavorites();

  const categoryByPath = useMemo<FavoritesCategory | null>(() => {
    if (pathname.startsWith("/apis/thispedrito1")) return "ecommerce";
    if (pathname.startsWith("/apis/alberto")) return "nba";
    if (pathname.startsWith("/apis/danifer24")) return "comida";
    if (pathname.startsWith("/apis/itziar")) return "peliculas";
    return null;
  }, [pathname]);

  const visibleSections = useMemo(() => {
    if (!categoryByPath) return sections;
    return sections.filter((section) => section.key === categoryByPath);
  }, [categoryByPath]);

  const visibleFavoritesCount = useMemo(() => {
    if (!categoryByPath) return favorites.length;
    return favorites.filter((item) => item.category === categoryByPath).length;
  }, [favorites, categoryByPath]);

  const grouped = useMemo(() => {
    return sections.reduce<Record<FavoritesCategory, FavoriteItem[]>>(
      (acc, section) => {
        acc[section.key] = favorites.filter((item) => item.category === section.key);
        return acc;
      },
      { ecommerce: [], nba: [], comida: [], peliculas: [] },
    );
  }, [favorites]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="rounded-md border border-gray-700 px-3 py-2 text-sm hover:bg-gray-900"
      >
        Favoritos ({visibleFavoritesCount})
      </button>

      {open && (
        <div className="absolute right-0 z-[999] mt-2 max-h-[70vh] w-[24rem] overflow-y-auto rounded-md border border-gray-700 bg-black p-4 shadow-xl">
          {visibleSections.map((section) => (
            <div key={section.key} className="mb-4 last:mb-0">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-300">{section.label}</h3>

              {grouped[section.key].length === 0 ? (
                <p className="text-xs text-gray-400">Sin elementos</p>
              ) : (
                <ul className="space-y-2">
                  {grouped[section.key].map((item) => (
                    <li key={item.key} className="flex items-center justify-between gap-3 rounded border border-gray-700 bg-gray-950 p-2">
                      <div className="flex min-w-0 items-center gap-2">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-10 w-10 flex-none rounded object-cover"
                          />
                        )}
                        <div className="min-w-0">
                          <p className="truncate text-sm text-white">{item.title}</p>
                          {item.subtitle && (
                            <p className="truncate text-xs text-gray-400">{item.subtitle}</p>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFavorite(item.key)}
                        aria-label={`Eliminar ${item.title} de favoritos`}
                        className="rounded p-1 text-gray-300 hover:bg-gray-800 hover:text-red-400"
                      >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                          <path d="M9 3h6l1 2h4v2H4V5h4l1-2zm1 6h2v9h-2V9zm4 0h2v9h-2V9zM7 9h2v9H7V9z" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}