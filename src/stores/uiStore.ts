import { create } from 'zustand';

interface UIStore {
  dragMenu: boolean;
  cartMobile: boolean;
  activeTab: string;

  setCartMobile: (cartMobile: boolean) => void;
  setDragMenu: (dragMenu: boolean) => void;
  toggleDragMenu: () => void;
  setActiveTab: (tab: string) => void;
}

export const useUIStore = create<UIStore>((set, get) => ({
  dragMenu: false,
  activeTab: '',
  cartMobile: false,

  setCartMobile: (cartMobile: boolean) => set({ cartMobile }),
  setActiveTab: (tab: string) => set({ activeTab: tab }),
  setDragMenu: (dragMenu: boolean) => set({ dragMenu }),
  toggleDragMenu: () => set({ dragMenu: !get().dragMenu }),
}));
