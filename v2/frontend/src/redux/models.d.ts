export interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
}

export interface Task {
  title: string;
  description: string;
  ID: number;
  user_id: number;
  completed: boolean;
  CreatedAt: Date;
  UpdatedAt: Date;
}