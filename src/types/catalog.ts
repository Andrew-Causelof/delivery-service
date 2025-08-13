export type DishType = {
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
  quantity: number;
};

export type ProductSection = {
  title: string;
  desc: string;
  img: string;
  slug: string;
  items: DishType[];
};

export type DishFilter = {
  slug: string;
  name: string;
  icon?: string;
};
