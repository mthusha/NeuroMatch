import { API_BASE_URL } from "../config";
import axios from "axios";


export const getJobPostsByEmail = (email) => {
  return axios.get(`${API_BASE_URL}/job-post/${email}`);
};

export const postJobVacancy = async (formData, email) => {
  return new Promise((resolve, reject) => {
    if (!formData.image) {
      return reject("No image selected");
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Image = reader.result;

      const [salaryFrom, salaryTo] = formData.salaryRange.split('-').map(val =>
        parseInt(val.trim().replace(/\D/g, '')) || 0
      );

      const payload = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        requirements: formData.requirements,
        salaryFrom: salaryFrom || null,
        salaryTo: salaryTo || null,
        postedOn: new Date().toISOString().split('T')[0],
        createdOn: new Date().toISOString().split('T')[0],
        posterImageBase64: base64Image
      };

      try {
        const response = await fetch(`${API_BASE_URL}/job-post/${email}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (response.ok) {
          resolve(result);
        } else {
          reject(result.message || "Server error");
        }
      } catch (error) {
        reject(error.message || "Request failed");
      }
    };

    reader.readAsDataURL(formData.image);
  });
};



export const getRecommendedJobPosts = async (email, companyId, type) => {
  try {
    let url;

    if (type === "company") {
      url = `${API_BASE_URL}/job-post/company/${companyId}/job-posts?email=${encodeURIComponent(
        email
      )}`;
    } else {
      url = `${API_BASE_URL}/job-post/recommended/${encodeURIComponent(email)}`;
    }

    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.error("Error fetching job posts:", err);
    return {
      statusCode: 500,
      statusMessage: "Failed to fetch job posts",
      data: [],
    };
  }
};
