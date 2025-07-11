import { create } from 'zustand';
import type { Dish } from '../types/catalog';

export type CartItem = Dish & {
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  orderType: 'delivery' | 'pickup' | null;
  couponApplied: boolean;

  addItem: (dish: Dish) => void;
  removeItem: (id: number) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;

  totalPrice: () => number;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  orderType: null,
  couponApplied: false,

  addItem: (dish) => {
    const existing = get().items.find((item) => item.id === dish.id);
    if (existing) {
      set({
        items: get().items.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      });
    } else {
      set({ items: [...get().items, { ...dish, quantity: 1 }] });
    }
  },

  removeItem: (id) => set({ items: get().items.filter((item) => item.id !== id) }),

  increment: (id) =>
    set({
      items: get().items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    }),

  decrement: (id) =>
    set((state) => {
      const existing = state.items.find((item) => item.id === id);
      if (!existing) return { items: state.items };
      if (existing.quantity === 1) {
        return {
          items: state.items.filter((item) => item.id !== id),
        };
      }
      return {
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        ),
      };
    }),

  totalPrice: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
}));
