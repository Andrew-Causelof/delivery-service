import type { Dish } from './catalog';

export type CartItem = Pick<Dish, 'id' | 'img' | 'name' | 'price'> &
  Partial<Omit<Dish, 'id' | 'img' | 'name' | 'price'>> & {
    quantity: number;
  };

export type DeliveryType = 'delivery' | 'pickup';

export type CartStore = {
  items: CartItem[];
  loading: boolean;
  deliveryType: DeliveryType;
  setDeliveryType: (type: DeliveryType) => void;
  getDeliveryLabel: () => string;
  couponApplied: boolean;
  coupon: string;

  addItem: (dish: Dish) => void;
  removeItem: (id: number) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
  setCoupon: (coupon: string) => void;
  applyCoupon: (coupon: string) => void;
  removeCoupon: (coupon: string) => void;
  getAppliedCoupon: () => void;

  totalPrice: () => number;
  fetchCart: () => Promise<void>;
};
