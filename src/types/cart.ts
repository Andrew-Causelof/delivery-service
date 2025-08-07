import type { Dish } from './catalog';

export type CartItem = Pick<Dish, 'id' | 'img' | 'name' | 'price'> &
  Partial<Omit<Dish, 'id' | 'img' | 'name' | 'price'>> & {
    quantity: number;
  };

export type CartStore = {
  items: CartItem[];
  loading: boolean;
  orderType: 'delivery' | 'pickup' | null;
  couponApplied: boolean;

  addItem: (dish: Dish) => void;
  removeItem: (id: number) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;

  totalPrice: () => number;
  fetchCart: () => Promise<void>;
};
