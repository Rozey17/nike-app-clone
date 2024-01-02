import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface TFavoriteStore {
  favoriteItems: string[];
  addToFavorites: (itemId: string) => void;
  removeFromFavorites: (ItemId: string, favoriteItems: string[]) => void;
}

export const useFavoriteStore = create<TFavoriteStore>()(
  devtools(
    persist(
      (set) => ({
        favoriteItems: [],
        addToFavorites: (itemId) =>
          set((state: any) => ({
            favoriteItems: [...state.favoriteItems, itemId],
          })),
        removeFromFavorites: (itemId, favoriteItems) => {
          const index = favoriteItems.indexOf(itemId);
          favoriteItems.splice(index, 1);
          set((state) => ({
            favoriteItems: [...state.favoriteItems],
          }));
        },
      }),
      {
        name: "favoriteItems",
      }
    )
  )
);
