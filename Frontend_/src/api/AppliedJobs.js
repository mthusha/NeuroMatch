import { API_BASE_URL } from "../config";
import axios from "axios";

export const applyToJobPost = async (payload) => {
  try {
    const res = await fetch(`${API_BASE_URL}/applied-jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return {
      statusCode: res.status,
      data: data,
    };
  } catch (err) {
    console.error("API error in applyToJobPost:", err);
    throw err;
  }
};

export const getApplicantsByJobPostId = async (jobPostId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/applied-jobs/${jobPostId}/applicants`
    );
    return response.data;
  } catch (error) {
    console.error("Error in getApplicantsByJobPostId:", error);
    return { statusCode: 500, statusMessage: "API error", data: [] };
  }
};
