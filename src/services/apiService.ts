import axios from "axios";
import { ResponseModel, VerifyOtpResponseModel } from "@/models/response_model";

const API_BASE_URL = "https://api.mapman.in";

export const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiService.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token && config.headers) {
        config.headers["usertoken"] = token;
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export const getHomeData = async () => {
  try {
    const response = await apiService.get("/shop/nonauthendicateHome");
    return response.data;
  } catch (error) {
    console.error("Error fetching home data:", error);
    throw error;
  }
};

export const getHomeCategories = async () => {
  try {
    const response = await apiService.get("/shop/home");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const addNewCategoryApi = async (categoryName: string) => {
  try {
    const response = await apiService.post("/shop/addNewCategory", {
      categoryName,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};

export const deleteCategoryApi = async (categoryName: string) => {
  try {
    const response = await apiService.post("/shop/deleteCategory", {
      categoryName,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
export const searchShops = async (input: string) => {
  try {
    const response = await apiService.get(
      `/shop/nonauthendicateSearch?input=${input}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error searching shops:", error);
    throw error;
  }
};

export const getCategoryVideos = async () => {
  try {
    const response = await apiService.get("/shop/getCategoryVideos");
    return response.data;
  } catch (error) {
    console.error("Error fetching category videos:", error);
    throw error;
  }
};
export const getMyVideos = async () => {
  try {
    const response = await apiService.get("/shop/myVideos");
    return response.data;
  } catch (error) {
    console.error("Error fetching my videos:", error);
    throw error;
  }
};

export const fetchMyViewedVideos = async (page: number = 1) => {
  try {
    const response = await apiService.get(`/shop/fetchMyViewedVideos?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching viewed videos:", error);
    throw error;
  }
};

export const fetchMySavedVideos = async (page: number = 1) => {
  try {
    const response = await apiService.get(`/shop/fetchMySavedVideos?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching saved videos:", error);
    throw error;
  }
};

export const fetchSavedShops = async (page: number = 1) => {
  try {
    const response = await apiService.get(`/shop/fetchSavedShops?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching saved shops:", error);
    throw error;
  }
};
export const saveOthersVideosApi = async (videoId: number, status: string) => {
  try {
    const response = await apiService.post("/shop/saveOthersVideos", { videoId, status });
    return response.data;
  } catch (error) {
    console.error("Error saving video:", error);
    throw error;
  }
};

export const saveShopApi = async (shopId: number, status: string) => {
  try {
    const response = await apiService.post("/shop/saveShop", { shopId, status });
    return response.data;
  } catch (error) {
    console.error("Error saving shop:", error);
    throw error;
  }
};

export const deleteShopApi = async (shopId: number) => {
  try {
    const response = await apiService.get(`/shop/deleteShop?shopId=${shopId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting shop:", error);
    throw error;
  }
};

export const videoRegisterApi = async (formData: FormData) => {
  try {
    const response = await apiService.post("/shop/videoRegister", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error registering video:", error);
    throw error;
  }
};

export const updateVideoDetailsApi = async (body: any) => {
  try {
    const response = await apiService.post("/shop/updateVideoDetails", body);
    return response.data;
  } catch (error) {
    console.error("Error updating video details:", error);
    throw error;
  }
};

export const replaceVideoApi = async (formData: FormData) => {
  try {
    const response = await apiService.post("/shop/replaceVideo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error replacing video:", error);
    throw error;
  }
};

export const deleteVideoApi = async (videoId: number) => {
  try {
    const response = await apiService.post("/shop/deleteVideo", { videoId });
    return response.data;
  } catch (error) {
    console.error("Error deleting video:", error);
    throw error;
  }
};

export const getCategoryVideosPaginated = async (category: string, page: number = 1) => {
  try {
    const response = await apiService.get(`/shop/allVideos?category=${category}&page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category videos:", error);
    throw error;
  }
};

export const contactUsApi = async (body: any) => {
  try {
    const response = await apiService.post("/shop/contactUs", body);
    return response.data;
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
};

export const fetchShopApi = async () => {
  try {
    const response = await apiService.get("/shop/fetchShop");
    return response.data;
  } catch (error) {
    console.error("Error fetching shops:", error);
    throw error;
  }
};

export const getShopById = async (shopId: string | number) => {
  try {
    const response = await apiService.post("/shop/getShopById", {
      shopId: Number(shopId),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching shop details:", error);
    throw error;
  }
};

export const shopRegister = async (formData: FormData) => {
  try {
    const response = await apiService.post("/shop/shopRegister", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error registering/updating shop:", error);
    throw error;
  }
};

export const sendOtpApi = async (
  phoneNumber: string,
): Promise<ResponseModel> => {
  try {
    const response = await apiService.post("/shop/auth/sendOtp", {
      phoneNumber,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};

export const verifyOtpApi = async (
  phoneNumber: string,
  otp: number,
): Promise<VerifyOtpResponseModel> => {
  try {
    const response = await apiService.post("/shop/auth/verifyOtp", {
      phoneNumber,
      otp,
    });
    return response.data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};

export const fetchNotificationsApi = async (page: number = 1) => {
  try {
    const response = await apiService.get(
      `/shop/fetchNotifications?page=${page}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

export const fetchNotificationPreferenceApi = async () => {
  try {
    const response = await apiService.get("/shop/fetchNotificationPreference");
    return response.data;
  } catch (error) {
    console.error("Error fetching notification preferences:", error);
    throw error;
  }
};

export const updateNotificationPreferenceApi = async (data: {
  enableNotifications: number;
  newVideo: number;
  newShop: number;
}) => {
  try {
    const response = await apiService.post(
      "/shop/notificationPreference",
      data,
    );
    return response.data;
  } catch (error) {
    console.error("Error updating notification preferences:", error);
    throw error;
  }
};

export const reportIssueApi = async (formData: FormData) => {
  try {
    const response = await apiService.post("/shop/reportIssue", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error reporting issue:", error);
    throw error;
  }
};

export const getShopAnalyticsApi = async () => {
  try {
    const response = await apiService.get("/shop/analytics");
    return response.data;
  } catch (error) {
    console.error("Error fetching shop analytics:", error);
    throw error;
  }
};

export const logoutApi = async () => {
  try {
    const response = await apiService.post("/shop/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export const deleteAccountApi = async () => {
  try {
    const response = await apiService.post("/shop/deleteAccount");
    return response.data;
  } catch (error) {
    console.error("Error deleting account:", error);
    throw error;
  }
};

export const getProfileApi = async () => {
  try {
    const response = await apiService.get("/shop/getProfile");
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const updateProfileApi = async (formData: FormData) => {
  try {
    const response = await apiService.post("/shop/updateProfile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const sendEmailOtpApi = async (email: string) => {
  try {
    const response = await apiService.post("/shop/auth/sendEmailOtp", { email });
    return response.data;
  } catch (error) {
    console.error("Error sending email OTP:", error);
    throw error;
  }
};

export const verifyEmailOtpApi = async (email: string, otp: number) => {
  try {
    const response = await apiService.post("/shop/auth/verifyEmailOtp", { email, otp });
    return response.data;
  } catch (error) {
    console.error("Error verifying email OTP:", error);
    throw error;
  }
};

export const updateSendOtpApi = async (email: string, phone: string) => {
  try {
    const response = await apiService.post("/shop/auth/updateSendOtp", { email, phone });
    return response.data;
  } catch (error) {
    console.error("Error sending update mobile OTP:", error);
    throw error;
  }
};

export const updateVerifyOtpApi = async (email: string, phone: string, otp: number) => {
  try {
    const response = await apiService.post("/shop/auth/updateVerifyOtp", { email, phone, otp });
    return response.data;
  } catch (error) {
    console.error("Error verifying update mobile OTP:", error);
    throw error;
  }
};
