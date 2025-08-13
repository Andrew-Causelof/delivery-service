import { create } from 'zustand';
import type { ProductSection, DishType, DishFilter } from '../types/catalog';
import { API_BASE_URL } from '../config';

interface ProductStore {
  sections: ProductSection[];
  selectedFilters: string[];
  dishFilter: DishFilter[];
  loading: boolean;
  sectionLoaded: boolean;
  sectionsPromise: Promise<void> | null;
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
  sectionLoaded: false,
  sectionsPromise: null as Promise<void> | null,

  fetchSections: async () => {
    const s = get();
    if (s.sectionLoaded) return;
    if (s.sectionsPromise) return s.sectionsPromise;

    const p = (async () => {
      set({ loading: true });
      try {
        const res = await fetch(`${API_BASE_URL}/catalog/list`);
        const data = await res.json();
        const dishTypes = extractDishTypes(data);
        set({ sections: data, dishFilter: dishTypes, sectionLoaded: true });
      } catch (e) {
        console.error('Failed to fetch sections', e);
      } finally {
        set({ loading: false, sectionsPromise: null });
      }
    })();

    set({ sectionsPromise: p });
    return p;
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
        items: section.items.filter((dish: DishType) =>
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
