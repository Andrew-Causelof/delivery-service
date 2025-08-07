import { create } from 'zustand';
import type { ProductSection, Dish, DishFilter } from '../types/catalog';

interface ProductStore {
  sections: ProductSection[];
  selectedFilters: string[];
  dishFilter: DishFilter[];
  loading: boolean;
  fetchSections: () => Promise<void>;
  setSections: (sections: ProductSection[]) => void;
  setDishFilter: (types: DishFilter[]) => void;
  toggleFilter: (filterKey: string) => void;
  getFilteredSections: () => ProductSection[];
}

export const useProductStore = create<ProductStore>((set, get) => ({
  sections: [],
  dishFilter: [],
  selectedFilters: [],
  loading: false,

  fetchSections: async () => {
    set({ loading: true });
    try {
      const res = await fetch('http://dushes-cafe.seo-gravity.ru/api/catalog/list');
      const data = await res.json();
      const dishTypes = extractDishTypes(data);

      set({ sections: data, dishFilter: dishTypes, loading: false });
    } catch (e) {
      console.error('Failed to fetch sections', e);
      set({ loading: false });
    }
  },

  setSections: (sections) => set({ sections }),
  setDishFilter: (types: DishFilter[]) => set({ dishFilter: types }),

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

const extractDishTypes = (data: ProductSection[]): DishFilter[] => {
  const allTags: DishFilter[] = [];

  data.forEach((section) => {
    section.items.forEach((item) => {
      Object.entries(item.filterList || {}).forEach(([slug, name]) => {
        allTags.push({ slug, name, icon: slug }); // icon = slug
      });
    });
  });

  return Array.from(
    new Map(allTags.map(({ slug, ...rest }) => [slug, { slug, ...rest }])).values()
  );
};
