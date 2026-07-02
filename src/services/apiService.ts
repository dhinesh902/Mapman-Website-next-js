import axios from "axios";

const API_BASE_URL = "https://api.mapman.in";

export const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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
