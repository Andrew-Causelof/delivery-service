export type Dish = {
  id: number;
  img: string;
  name: string;
  price: number;
  weight: string;
  showOnMain: boolean;
  foId: string;
  filterList: string[];
  cardTags: string[];
  previewText: string;
  detailText: string;
};

export type ProductSection = {
  title: string;
  desc: string;
  img: string;
  slug: string;
  items: Dish[];
};

export type DishFilter = {
  slug: string;
  name: string;
  icon?: string;
};
