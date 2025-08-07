import { create } from 'zustand';
import axios from 'axios';
import type { CartItem, CartStore } from '../types/cart';
import { API_BASE_URL } from '../config';

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  orderType: null,
  couponApplied: false,
  loading: false,

  fetchCart: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(`${API_BASE_URL}/basket/get/items`);
      console.log(res.data.basketItems);
      set({ items: res.data.basketItems });
    } catch (e) {
      console.error('Ошибка загрузки корзины', e);
    } finally {
      set({ loading: false });
    }
  },

  addItem: (dish) => {
    const existing = get().items.find((item) => item.id === dish.id);
    if (existing) {
      //@TODO Add item to API /api/basket/add   productId = dish.id quantity = item.quantity + 1 ???
      set({
        items: get().items.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      });
    } else {
      //@TODO Add item to API /api/basket/add  productId = dish.id quantity = 1
      set({ items: [...get().items, { ...dish, quantity: 1 }] });
    }
  },

  //@TODO delete item from API /api/basket/delete  productId = id
  removeItem: (id) => set({ items: get().items.filter((item) => item.id !== id) }),

  increment: (id) =>
    //@TODO Add item to API /api/basket/add   productId = id quantity = item.quantity + 1 ???
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
        //@TODO delete item from API /api/basket/delete  productId = id
        return {
          items: state.items.filter((item) => item.id !== id),
        };
      }
      return {
        //@TODO Add item to API /api/basket/add   productId = id quantity = item.quantity - 1 ???
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        ),
      };
    }),

  totalPrice: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
}));
