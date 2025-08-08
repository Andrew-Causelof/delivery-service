import { create } from 'zustand';
import axios from 'axios';
import type { CartStore, DeliveryType } from '../types/cart';
import { API_BASE_URL } from '../config';

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  couponApplied: false,
  loading: false,
  coupon: '',
  deliveryType: 'delivery',
  setDeliveryType: (type: DeliveryType) => set({ deliveryType: type }),
  getDeliveryLabel: () => {
    const type = get().deliveryType;
    return type === 'delivery' ? 'Доставка' : 'Навынос';
  },

  clearCart: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(`${API_BASE_URL}/basket/clear`);
      console.log(res.data);
    } catch (e) {
      console.error('Ошибка очистки корзины', e);
    } finally {
      set({ loading: false, items: [] });
    }
  },

  applyCoupon: async (coupon) => {
    set({ loading: true });
    try {
      const res = await axios.post(`${API_BASE_URL}/coupon/apply`, {
        code: coupon,
      });
      console.log(res.data);
      set({ couponApplied: true, coupon: coupon });
    } catch (e) {
      console.error('Ошибка применения купона', e);
    } finally {
      set({ loading: false });
    }
  },

  getAppliedCoupon: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(`${API_BASE_URL}/coupon/get/applied`);
      console.log(res.data);
      //set({ coupon: res.data.coupon });
    } catch (e) {
      console.error('Ошибка загрузки примененного купона', e);
    } finally {
      set({ loading: false });
    }
  },

  removeCoupon: async (coupon) => {
    set({ loading: true });
    try {
      const res = await axios.post(`${API_BASE_URL}/coupon/cancel`, {
        code: coupon,
      });
      console.log(res.data);
      set({ couponApplied: false, coupon: '' });
    } catch (e) {
      console.error('Ошибка при удалении купона', e);
    } finally {
      set({ loading: false });
    }
  },

  setCoupon: (coupon) => {
    set({ coupon });
  },

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

  addItem: async (dish) => {
    try {
      await axios.post(`${API_BASE_URL}/basket/add`, {
        productId: dish.id,
        quantity: 1,
      });
      set((state) => {
        const exists = state.items.find((item) => item.id === dish.id);
        if (exists) {
          return {
            items: state.items.map((item) =>
              item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          };
        } else {
          return {
            items: [...state.items, { ...dish, quantity: 1 }],
          };
        }
      });
    } catch (e) {
      console.error('Ошибка при добавлении товара в корзину', e);
    }
  },

  removeItem: async (id) => {
    try {
      await axios.post(`${API_BASE_URL}/basket/delete`, { productId: id });
      set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      }));
    } catch (e) {
      console.error('Ошибка при удалении товара из корзины', e);
    }
  },

  increment: async (id) => {
    const existing = get().items.find((item) => item.id === id);
    if (!existing) return;
    try {
      await axios.post(`${API_BASE_URL}/basket/add`, {
        productId: id,
        quantity: existing.quantity + 1,
      });
      set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      }));
    } catch (e) {
      console.error('Ошибка при изменении кол-ва товара в корзине', e);
    }
  },

  decrement: async (id) => {
    const existing = get().items.find((item) => item.id === id);
    if (!existing) return;
    if (existing.quantity === 1) {
      get().removeItem(id);
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/basket/add`, {
        productId: id,
        quantity: existing.quantity - 1,
      });
      set((state) => ({
        items: state.items
          .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
          .filter((item) => item.quantity > 0),
      }));
    } catch (e) {
      console.error('Ошибка при изменении кол-ва товара в корзине', e);
    }
  },

  totalPrice: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
}));
