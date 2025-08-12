import type { Dish } from './catalog';

export type CartItem = Pick<Dish, 'id' | 'img' | 'name' | 'price'> &
  Partial<Omit<Dish, 'id' | 'img' | 'name' | 'price'>> & {
    quantity: number;
  };

export type DeliveryType = 'delivery' | 'pickup';

export type ApiCouponAmount = {
  DISCOUNT_VALUE: string;
  TOTAL_PRICE: string;
  PRICE_WITHOUT_DISCOUNT: string;
};

export type ApiCouponResponse = {
  success: boolean;
  status: string;
  message: string;
  error?: string[]; // или другой тип под ошибки
  amount?: ApiCouponAmount;
};

export type CartStore = {
  items: CartItem[];
  loading: boolean;
  deliveryType: DeliveryType;
  couponApplied: boolean;
  coupon: string;

  discount: string;
  totalPrice: string;
  priceWithDiscount: string;

  setDeliveryType: (type: DeliveryType) => void;
  getDeliveryLabel: () => string;

  updateQuantity: (dish: CartItem, change: number) => void;
  addItem: (dish: CartItem) => void;
  increment: (dish: CartItem) => void;
  decrement: (dish: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;

  setCoupon: (coupon: string) => void;
  applyCoupon: (coupon: string) => Promise<ApiCouponResponse>;
  removeCoupon: () => Promise<ApiCouponResponse>;
  getAppliedCoupon: () => void;

  fetchCart: () => Promise<void>;
};
