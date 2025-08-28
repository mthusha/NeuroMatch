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

export const fetchCompanyStats = async (companyId, jwt) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/company/follow-applied/${companyId}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch company stats: ${res.status}`);
    }

    const result = await res.json();
    return result?.data || { totalFollows: 0, totalApplied: 0 };
  } catch (err) {
    console.error("fetchCompanyStats error:", err);
    return { totalFollows: 0, totalApplied: 0 };
  }
};

export const deleteJobPost = async (jobPostId, jwt) => {
  try {
    const res = await fetch(`${API_BASE_URL}/job-post/${jobPostId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.ok && data.statusCode === 200) {
      return true;
    }

    throw new Error(data.statusMessage || "Failed to delete job post");
  } catch (err) {
    console.error("Error deleting job post:", err);
    throw err;
  }
};
