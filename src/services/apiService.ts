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
  (error) => Promise.reject(error)
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
export const searchShops = async (input: string) => {
  try {
    const response = await apiService.get(`/shop/nonauthendicateSearch?input=${input}`);
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

export const sendOtpApi = async (phoneNumber: string): Promise<ResponseModel> => {
  try {
    const response = await apiService.post("/shop/auth/sendOtp", { phoneNumber });
    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};

export const verifyOtpApi = async (phoneNumber: string, otp: number): Promise<VerifyOtpResponseModel> => {
  try {
    const response = await apiService.post("/shop/auth/verifyOtp", { phoneNumber, otp });
    return response.data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};
