export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  // category: string;
  image: string;
  // rating: Rating;
  gender: string;
  item: any;
}

export interface Rating {
  rate: number;
  count: number;
}
