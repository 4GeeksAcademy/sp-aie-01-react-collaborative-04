"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { useCallback } from "react";

export type FavoritesCategory = "ecommerce" | "nba" | "comida" | "peliculas";

export interface FavoriteItem {
  key: string;
  id: number;
  title: string;
  subtitle?: string;
  image?: string;
  category: FavoritesCategory;
}

interface FavoritesContextValue {
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (key: string) => void;
  isFavorite: (key: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const addFavorite = useCallback((item: FavoriteItem) => {
    setFavorites((current) => {
      const exists = current.some((favorite) => favorite.key === item.key);
      if (exists) return current;
      return [...current, item];
    });
  }, []);

  const removeFavorite = useCallback((key: string) => {
    setFavorites((current) => current.filter((favorite) => favorite.key !== key));
  }, []);

  const isFavorite = useCallback(
    (key: string) => favorites.some((favorite) => favorite.key === key),
    [favorites],
  );

  const value = useMemo(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
    }),
    [favorites, addFavorite, removeFavorite, isFavorite],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites debe usarse dentro de FavoritesProvider");
  }

  return context;
}