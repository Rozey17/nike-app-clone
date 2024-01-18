import { create } from "zustand";
import { Product } from "../components/ApolloComponents";

export interface CartState {
  products: Array<Product & { quantity: number }>;
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  clearCart: () => void;
  items: number;
}

const useCartStore = create<CartState>((set) => ({
  products: [],
  items: 0,
  addProduct: (product: Product) =>
    set((state) => {
      state.items++;
      const hasProduct = state.products.find(
        (p) => p._id === product._id && p.size === product.size
      );
      if (hasProduct) {
        return {
          products: state.products.map((p) => {
            if (p._id === product._id && p.size?.value === product.size?.value) {
              return { ...p, quantity: p.quantity + 1 };
            }
            return p;
          }),
        };
      } else {
        return {
          products: [...state.products, { ...product, quantity: 1 }],
        };
      }
    }),
  removeProduct: (product: Product) =>
    set((state) => {
      return {
        products: state.products
          .map((p) => {
            if (p._id === product._id && p.size?.value === product.size?.value) {
              state.items--;
              return { ...p, quantity: p.quantity - 1 };
            }
            return p;
          })
          .filter((p) => p.quantity > 0),
      };
    }),
  clearCart: () =>
    set(() => {
      return {
        items: 0,
        products: [],
      };
    }),
}));

export default useCartStore;