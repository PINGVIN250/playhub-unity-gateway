
export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  isAdmin?: boolean;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  gameUrl: string;
  authorId: string;
  author?: User;
  width?: number;
  height?: number;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  featured?: boolean;
}

export type LoginFormData = {
  email: string;
  password: string;
};

export type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type GameFormData = {
  title: string;
  description: string;
  coverImage: File | null;
  gameUrl: string;
  width: number;
  height: number;
  tags: string[];
};
