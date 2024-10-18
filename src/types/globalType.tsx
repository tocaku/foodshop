export interface ICuisine {
  id: number;
  name: string;
  // other fields related to cuisine
}

export interface ICategory {
  id: number;
  name: string;
  // other fields related to category
}
export interface IUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  password: string;
  confirm_password: string;
  image: string;
  mobile_no: string;
  // other fields related to user
}
export interface IReview {
  id: number;
  title: string;
  body: string;
  reviewer: number;
  menu: number;
  rating: number;
  created: string;
}
export interface IFood {
  id: number;
  cuisine: number[]; // Array of cuisine objects
  title: string;
  description: string;
  image: string;
  quantity: number;
  category: number; // Category object
  rating: number;
  price: number;
  review_count?: number;
  discount: number;
}
export interface IUser {
  id: number;
  user: string;
  image: string;
  mobile_no: string;
  address: string;
}
export interface IAccount {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_superuser: boolean;
}
export interface IOrder {
  id: number;
  customer: number;
  menu: number;
  order_status: string;
  quantity: number;
  created_on: string;
  cost: number;
  is_paid: boolean;
  menu_image?: string;
  menu_title?: string;
  menu_price?: string;
}
export interface ICart {
  id: number;
  customer: number;
  menu: number;
  quantity: number;
  created_on: string;
  cost: number;
}
export interface IUSER {
  id: number;
  user: string;
  image: string;
  mobile_no: string;
  address: string;
  amount: number;
  role: string;
}
