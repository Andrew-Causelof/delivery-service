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
};

export type ProductSection = {
  title: string;
  desc: string;
  img: string;
  slug: string;
  items: Dish[];
};
