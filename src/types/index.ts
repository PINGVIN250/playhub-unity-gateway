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
  gameFiles: {
    wasmPath: string | null;
    dataPath: string | null;
    frameworkPath: string | null;
    loaderPath: string | null;
    indexPath: string | null;
  };
  authorId: string;
  author?: User;
  width: number;
  height: number;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  featured: boolean;
}

export interface Comment {
  id: string;
  gameId: string;
  userId: string;
  user?: User;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Rating {
  id: string;
  gameId: string;
  userId: string;
  score: number;
  createdAt: Date;
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
  width: number;
  height: number;
  tags: string[];
  gameFiles: {
    wasm: File | null;
    data: File | null;
    framework: File | null;
    loader: File | null;
    index: File | null;
  };
};
