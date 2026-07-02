export interface TopBanner {
  id: number;
  backgroundImage: string;
  image: string;
  title: string;
  subtitle: string;
  contact: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  categoryName: string;
  categoryImage: string | null;
  categoryType: string;
}

export interface CategoryBanner {
  id: number;
  category: string;
  backgroundImage: string;
  image: string;
  title: string;
  subtitle: string;
  contact: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
export interface Shop {
  id?: number;
  profileId?: number;
  shopImage?: null | string;
  shopName?: string;
  category?: string;
  lat?: string;
  long?: string;
  websiteLink?: null | string;
  address?: string;
  description?: string;
  whatsappNumber?: string;
  registerNumber?: string;
  shopNumber?: string;
  openTime?: string;
  closeTime?: string;
  image1?: null | string;
  image2?: null | string;
  image3?: null | string;
  image4?: null | string;
  imageApprove?: null;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface HomeResponse {
  status: number;
  data: {
    topBanners?: TopBanner[];
    category?: Category[];
    categoryBanners?: CategoryBanner[];
    shops?: Shop[];
  };
}
