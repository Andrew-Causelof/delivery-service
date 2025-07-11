import { create } from 'zustand';
import type { ProductSection, Dish } from '../types/catalog';

interface ProductStore {
  sections: ProductSection[];
  selectedFilters: string[];
  loading: boolean;
  fetchSections: () => Promise<void>;
  setSections: (sections: ProductSection[]) => void;
  toggleFilter: (filterKey: string) => void;
  getFilteredSections: () => ProductSection[];
}

export const useProductStore = create<ProductStore>((set, get) => ({
  sections: [],
  selectedFilters: [],
  loading: false,

  fetchSections: async () => {
    set({ loading: true });
    try {
      const res = await fetch('http://dushes-cafe.seo-gravity.ru/api/catalog/list');
      const data = await res.json();
      // console.log(data);
      set({ sections: data, loading: false });
    } catch (e) {
      console.error('Failed to fetch sections', e);
      set({ loading: false });
    }
  },

  setSections: (sections) => set({ sections }),
  toggleFilter: (slug: string) => {
    const filters = get().selectedFilters.includes(slug)
      ? get().selectedFilters.filter((f) => f !== slug)
      : [...get().selectedFilters, slug];

    // просто меняем selectedFilters — без вычислений
    set({ selectedFilters: filters });
  },
  getFilteredSections: () => {
    const { sections, selectedFilters } = get();

    if (selectedFilters.length === 0) return sections;

    return sections
      .map((section) => ({
        ...section,
        items: section.items.filter((dish: Dish) =>
          Object.keys(dish.filterList).some((key) => selectedFilters.includes(key))
        ),
      }))
      .filter((section) => section.items.length > 0);
  },
}));
