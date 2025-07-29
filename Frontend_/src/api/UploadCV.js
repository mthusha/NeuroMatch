import axios from "axios";
import { CV_BASE_URL } from "../config"; 
import { API_BASE_URL } from "../config";
export const uploadFileToApi = async (file) => {
  if (!file) {
    return { success: false, error: "No file selected" };
  }

  if (!file.name.toLowerCase().endsWith(".pdf")) {
    return { success: false, error: "Only PDF files are allowed" };
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${CV_BASE_URL}/upload-cv`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return { success: true, data: response.data.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || "Failed to upload file",
    };
  }
};

export const sendProcessedData = async (data,jwt,email) => {
    // console.log(data);
  try {
    if (!data || !data.personal_info || !data.personal_info.name) {
      throw new Error("Invalid data structure");
    }

    const response = await fetch(`${API_BASE_URL}/job-seeker/cv/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt,
      },
      body: JSON.stringify({
        cv_data: data,
        metadata: {
          processed_at: new Date().toISOString(),
          source: "web-upload",
        },
        user: email,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to save CV data");
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Error sending processed data:", error);
    return {
      success: false,
      error: error.message || "Network error occurred",
    };
  }
};