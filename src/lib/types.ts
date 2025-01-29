export interface Novel {
  id: string;
  title: string;
  author: string;
  genres: string[];
  synopsis: string;
  cover: string | null;
  banner: string | null;
  totalViews: number;
  status: 'ongoing' | 'completed';
  last_updated: string;
  average_rating: number;
}

export interface NovelResponse {
  success: boolean;
  data: Novel;
}

export interface Subs {
  isSubscribed: boolean;
  total: number;
}

export interface Favs {
  isFavorited: boolean;
  total: number;
}

export interface SubsResponse<T> {
  success: boolean;
  data: T;
}

export interface Rating {
  createdAt: string;
  id: number;
  novelId: string;
  rating: number;
  userId: string;
}

export type RatingResponse = { success: false; error: string } | { success: true; data: Rating };

export interface HotNovel {
  id: number;
  image: string;
  novelId: string;
  createdAt: string | Date;
}

export interface Topnovel {
  id: string;
  title: string;
  cover: string;
}

export type FavoriteResponse =
  | { success: true; action: 'added'; data: string }
  | { success: true; action: 'deleted'; data: string }
  | { success: false; error: string };

export type User = {
  id: string;
  email: string;
  name: string;
  type?: 'user' | 'admin';
  image?: string | undefined;
  createdAt?: string | undefined;
};

export type Session = {
  id: string;
  userId: string;
  expiresAt: Date;
};
