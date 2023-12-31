export interface ProductType {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  gender?: string;
  size?: string | number;
  category: string;
  sub_category: string;
  quantity?: number;
}

