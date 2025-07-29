import axios from "axios";
import { API_BASE_URL } from "../config";

export const searchCompanies = async (keyword) => {
  const res = await axios.get(`${API_BASE_URL}/company/search/${keyword}`);
  if (res.data?.statusCode === 200) return res.data.data;
  return [];
};

export const searchUsers = async (keyword) => {
  const res = await axios.get(`${API_BASE_URL}/user/search/${keyword}`);
  if (res.data?.statusCode === 200) return res.data.data;
  return [];
};
