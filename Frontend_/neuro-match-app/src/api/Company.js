import { API_BASE_URL } from "../config";

const fetchNotFollowedCompanies = async (email) => {
  const res = await fetch(`${API_BASE_URL}/company/followed-list/${email}`);
  const json = await res.json();
  if (!res.ok || json.statusCode !== 200) {
    throw new Error(json.statusMessage || "Failed to fetch");
  }
  return json.data;
};

export default fetchNotFollowedCompanies;


export const fetchCompanyDashboard = async (email) => {
  const response = await fetch(
    `${API_BASE_URL}/company/company/dashboard/${email}`
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.statusMessage || "Failed to fetch company dashboard");
  }

  const data = await response.json();

  if (data.statusCode !== 200) {
    throw new Error(data.statusMessage || "API returned error");
  }

  return data.data;
};

export const fetchEmailByCompanyId = async (id) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/company/id-by-email/${id}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch email: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error("Error fetching email by company ID:", error);
    throw error;
  }
};
