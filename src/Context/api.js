import axios from "axios";

// const BASE_URL = "http://localhost:3000"; // Replace with your backend URL
const BASE_URL = "https://api.celestialflames.shop"; // Replace with your backend URL


export const getLogo = () => axios.get(`${BASE_URL}/logo`);
export const getAllStock = () => axios.get(`${BASE_URL}/stocks`);
export const getAllProducts = () => axios.get(`${BASE_URL}/products`);
export const getHomeBanner = () => axios.post(`${BASE_URL}/banner`);
export const getCategoryBanner = () => axios.post(`${BASE_URL}/categoryBanner`);
export const getSeasonalBanner = () => axios.post(`${BASE_URL}/seasonalBanner`);
