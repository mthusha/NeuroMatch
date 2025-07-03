import { API_BASE_URL } from "../config";

const fetchNotFollowedCompanies = async (email) => {
  const res = await fetch(`${API_BASE_URL}/company/not-followed-list/${email}`);
  const json = await res.json();
  if (!res.ok || json.statusCode !== 200) {
    throw new Error(json.statusMessage || "Failed to fetch");
  }
  return json.data;
};

export default fetchNotFollowedCompanies;
