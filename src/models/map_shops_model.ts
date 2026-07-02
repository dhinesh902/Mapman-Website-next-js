export interface MapShopsModel {
  status?: number;
  data?: Datum[];
}

export interface Datum {
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
  image2?: null;
  image3?: null;
  image4?: null;
  imageApprove?: null;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}
