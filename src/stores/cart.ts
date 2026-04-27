import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/menu";

export type CartItem = {
  product: Product;
  quantity: number;
  notes?: string;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product, quantity: number, notes?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product, quantity, notes) =>
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + quantity, notes: notes ?? i.notes }
                  : i,
              ),
            };
          }
          return { items: [...state.items, { product, quantity, notes }] };
        }),
      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.product.id !== productId) })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.product.id !== productId)
              : state.items.map((i) =>
                  i.product.id === productId ? { ...i, quantity } : i,
                ),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "cantina-verde-cart",
    },
  ),
);

export const selectCount = (state: { items: CartItem[] }) =>
  state.items.reduce((acc, i) => acc + i.quantity, 0);

export const selectSubtotal = (state: { items: CartItem[] }) =>
  state.items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
