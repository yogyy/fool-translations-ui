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
  publishedAt: Date;
  lastUpdated: Date;
  averageRating: number;
}

export interface Chapter {
  id: string;
  chapterNum: number;
  title: string;
  createdAt: Date;
  content: string;
}

export interface NovelResponse {
  success: boolean;
  data: Novel;
}

export interface SubscribeData {
  isSubscribed: boolean;
  total: number;
}

export interface FavoriteData {
  isFavorited: boolean;
  total: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface RatingData {
  isRated: boolean;
  rating: number;
}

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
  genres: string[];
}

export type MutateResponse =
  | { success: true; action: 'added'; data: string }
  | { success: true; action: 'removed'; data: string }
  | { success: false; error: string };

export type User = {
  id: string;
  email: string;
  name: string;
  type?: 'user' | 'admin';
  avatar?: string | undefined;
  createdAt?: string | undefined;
};

export type Session = {
  id: string;
  userId: string;
  expiresAt: Date;
};

export interface Notification {
  id: string;
  userId: string;
  type: string;
  isRead: boolean;
  createdAt: Date;
  novel: Pick<Novel, 'id' | 'title' | 'cover'>;
}

export interface GoogleOAuthResponse {
  sub: string;
  email: string;
  email_verified: boolean;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
}

export interface DiscordOAuthResponse {
  id: string;
  username: string;
  avatar: string | null;
  discriminator: string;
  public_flags: number;
  flags: number;
  banner: string | null;
  accent_color: number | null;
  global_name: string | null;
  avatar_decoration_data: {
    sku_id: string;
    asset: string;
  } | null;
  banner_color: number | null;
  clan: string | null;
  primary_guild: string | null;
  mfa_enabled: boolean;
  locale: string;
  premium_type: number;
  email: string;
  verified: boolean;
}

export interface CloudinaryResponse {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  resource_type: 'image' | 'raw' | 'video' | 'all';
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  access_mode: string;
  existing: boolean;
  original_filename: string;
}

export interface TurnstileResponse {
  success: boolean;
  'error-codes': string[];
  messages: string[];
}
