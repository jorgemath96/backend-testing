export interface User {
  user: string;
  password: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  availability: number;
  num_reviews: number;
  stars: number;
  description: string;
}

export interface Query {
  price?: string;
  phrase?: string;
}
