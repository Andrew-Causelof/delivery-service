import { create } from 'zustand';
import type { ProductSection } from '../types/catalog';

interface ProductStore {
  sections: ProductSection[];
  loading: boolean;
  fetchSections: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  sections: [],
  loading: false,

  fetchSections: async () => {
    set({ loading: true });
    try {
      const res = await fetch('http://dushes-cafe.seo-gravity.ru/api/catalog/list');
      const data = await res.json();
      console.log(data);
      set({ sections: data, loading: false });
    } catch (e) {
      console.error('Failed to fetch sections', e);
      set({ loading: false });
    }
  },
}));
