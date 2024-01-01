import { create } from "zustand";
import { ProductType } from "./interfaces";

export interface WishlistState {
  favourites: Array<ProductType>;
  addToFavourites: (product: ProductType) => void;
  removeFromFavourites: (product: ProductType) => void;
  clearWishlist: () => void;
  favouriteItems: number;
}

const useWishlistStore = create<WishlistState>((set) => ({
  favourites: [],
  favouriteItems: 0,
  addToFavourites: (product: ProductType) =>
    set((state) => {
      state.favouriteItems++;
      const hasProduct = state.favourites.find((p) => p.id === product.id);
      if (hasProduct) {
        return {
          favourites: state.favourites.map((p) => {
            if (p.id === product.id) {
              return { ...p };
            }
            return p;
          }),
        };
      } else {
        return {
          favourites: [...state.favourites, { ...product }],
        };
      }
    }),
  removeFromFavourites: (product: ProductType) =>
    set((state) => {
      return {
        favourites: state.favourites.map((p) => {
          if (p.id === product.id) {
            state.favouriteItems--;
            return { ...p };
          }
          return p;
        }),
      };
    }),
  clearWishlist: () =>
    set(() => {
      return {
        items: 0,
        favourites: [],
      };
    }),
}));

export default useWishlistStore;
