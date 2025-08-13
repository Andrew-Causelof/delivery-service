import { create } from 'zustand';
import axios from 'axios';
import type { CartStore, DeliveryType, CartItem, ApiCouponResponse } from '../types/cart';
import { API_BASE_URL } from '../config';

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  couponApplied: false,
  loading: false,
  coupon: '',
  deliveryType: 'delivery' as DeliveryType,
  discount: '',
  totalPrice: '',
  priceWithDiscount: '',
  leadTime: '~60 мин',

  setDeliveryType: (type: DeliveryType) => set({ deliveryType: type }),

  getDeliveryLabel: () => {
    const type = get().deliveryType;
    return type === 'delivery' ? 'Доставка' : 'Навынос';
  },

  clearCart: async () => {
    set({ loading: true });
    try {
      await axios.post(`${API_BASE_URL}/basket/clear`);
      set({
        items: [],
        loading: false,
        discount: '0',
        totalPrice: '0',
        priceWithDiscount: '0',
      });
    } catch (e) {
      console.error('Ошибка очистки корзины', e);
    } finally {
      set({ loading: false, items: [] });
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

  applyCoupon: async (coupon: string): Promise<ApiCouponResponse> => {
    set({ loading: true });
    try {
      const { data } = await axios.post<ApiCouponResponse>(
        `${API_BASE_URL}/coupon/apply`,
        { coupon },
        { withCredentials: true }
      );

      if (data.success) {
        set({ couponApplied: true, coupon });

        if (data.amount) {
          set({
            discount: data.amount.DISCOUNT_VALUE,
            totalPrice: data.amount.TOTAL_PRICE,
            priceWithDiscount: data.amount.PRICE_WITHOUT_DISCOUNT,
          });
        }
      }
      return data;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        return (
          (e.response.data as ApiCouponResponse) || {
            success: false,
            status: 'error',
            message: 'Неизвестная ошибка as ApiCouponResponse',
          }
        );
      }
      return { success: false, status: 'error', message: 'Неизвестная ошибка as catch' };
    } finally {
      set({ loading: false });
    }
  },

  removeCoupon: async (): Promise<ApiCouponResponse> => {
    set({ loading: true });
    try {
      const { data } = await axios.post<ApiCouponResponse>(
        `${API_BASE_URL}/coupon/cancel`,
        {}, // пустое тело
        { withCredentials: true }
      );

      if (data.success) {
        set({ couponApplied: false, coupon: '' });

        if (data.amount) {
          set({
            discount: data.amount.DISCOUNT_VALUE,
            totalPrice: data.amount.TOTAL_PRICE,
            priceWithDiscount: data.amount.PRICE_WITHOUT_DISCOUNT,
          });
        }
      }
      return data;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        return (
          (e.response.data as ApiCouponResponse) || {
            success: false,
            status: 'error',
            message: 'Неизвестная ошибка as ApiCouponResponse',
          }
        );
      }
      return { success: false, status: 'error', message: 'Неизвестная ошибка as catch' };
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
      // console.log(res.data);
      set({
        items: res.data.basketItems,
        loading: false,
        discount: res.data.amount['DISCOUNT_VALUE'],
        totalPrice: res.data.amount['TOTAL_PRICE'],
        priceWithDiscount: res.data.amount['PRICE_WITHOUT_DISCOUNT'],
      });
    } catch (e) {
      console.error('Ошибка загрузки корзины', e);
    } finally {
      set({ loading: false });
    }
  },

  updateQuantity: async (dish: CartItem, change: number) => {
    const { items } = get();
    const productId = dish.id;
    const existing = items.find((item) => item.id === productId);
    const newQuantity = (existing?.quantity || 0) + change;

    if (newQuantity <= 0) {
      // если стало 0 или меньше — удаляем
      set({ items: items.filter((item) => item.id !== productId) });
      get().removeItem(productId);
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/basket/add`, {
        productId: productId,
        quantity: newQuantity,
      });

      const updatedItems = existing
        ? items.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item))
        : [...items, { ...dish, quantity: newQuantity }];

      set({
        items: updatedItems,
        loading: false,
        discount: res.data.amount['DISCOUNT_VALUE'],
        totalPrice: res.data.amount['TOTAL_PRICE'],
        priceWithDiscount: res.data.amount['PRICE_WITHOUT_DISCOUNT'],
      });
    } catch (error) {
      console.error('Ошибка при обновлении количества', error);
    }
  },

  addItem: async (dish: CartItem) => {
    get().updateQuantity(dish, 1);
  },

  increment: async (dish: CartItem) => {
    get().updateQuantity(dish, 1);
  },

  decrement: async (dish: CartItem) => {
    get().updateQuantity(dish, -1);
  },

  removeItem: async (id) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/basket/delete`, { productId: id });
      set((state) => ({
        items: state.items.filter((item) => item.id !== id),
        loading: false,
        discount: res.data.amount['DISCOUNT_VALUE'],
        totalPrice: res.data.amount['TOTAL_PRICE'],
        priceWithDiscount: res.data.amount['PRICE_WITHOUT_DISCOUNT'],
      }));
    } catch (e) {
      console.error('Ошибка при удалении товара из корзины', e);
    }
  },
}));
