export interface CategoryideosModel {
  status?: number;
  data?: CategoryVideoData[];
}

export interface CategoryVideoData {
  id?: number;
  categoryId?: number;
  categoryName?: string;
  categoryVideo?: string;
  thumbnail?: null;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MyvideosModel {
    status?: number;
    data?:   MyVideosData[];
}

export interface MyVideosData {
    id?:          number;
    profileId?:   number;
    shopId?:      number;
    video?:       string;
    thumbnail?:   string;
    videoTitle?:  string;
    shopName?:    string;
    category?:    string;
    description?: string;
    status?:      string;
    createdAt?:   string;
    updatedAt?:   string;
    views?:       number;
}