export interface ProductType {
  id: number;
  name: string;
  price: number;
  description: string;
  // category: string;
  image: string;
  // rating: Rating;
  gender: string;
  size?: number;
}

export interface Rating {
  rate: number;
  count: number;
}
