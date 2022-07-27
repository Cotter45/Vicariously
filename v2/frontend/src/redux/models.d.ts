export interface User {
  ID: number;
  username: string;
  email: string;
  password?: string;
}

export interface Post {
  title: string;
  description: string;
  address: string;
  user_id: number;
  category_id: number;
  images: Image[];
  user: User;
  category: Category;
  bookings: Booking[];
  reviews: Review[];
  rules: Rule[];
  ID: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  start_date: Date;
  end_date: Date;
  confirmed: boolean;
  post_id: number;
  user_id: number;
  post: Post;
  user: User;
  ID: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  name: string;
  description: string;
  posts: Post[];
  ID: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Chat {
  name: string;
  host_id: number;
  guest_id: number;
  host: User;
  guest: User;
  messages: Message[];
  ID: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Image {
  name: string;
  description: string;
  url: string;
  post_id: number;
  user_id: number;
  messages: Message[];
  post: Post;
  user: User;
  ID: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  message: string;
  image_id: number;
  user_id: number;
  chat_id: number;
  user: User;
  chat: Chat;
  image: Image;
  ID: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  rating: number;
  comment: string;
  post_id: number;
  user_id: number;
  post: Post;
  user: User;
  ID: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Rule {
  name: string;
  description: string;
  post_id: number;
  post: Post;
  ID: number;
  createdAt: Date;
  updatedAt: Date;
}

