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


export const fetchAppliedJobsByEmail = async (email) => {
  const encodedEmail = encodeURIComponent(email);
  const response = await fetch(`${API_BASE_URL}/applied-jobs/${encodedEmail}`);

  if (!response.ok) {
    throw new Error('Failed to fetch applied jobs');
  }

  const data = await response.json();
  
  return Array.isArray(data.data)
    ? data.data.map(job => ({
        ...job,
        status: job.status || 'pending'
      }))
    : [];
};


export const updateCandidateStatus = async (candidateId, newStatus, token) => {
  const response = await fetch(
    `${API_BASE_URL}/applied-jobs/status-update?id=${candidateId}&status=${newStatus}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(errText || "Failed to update status");
  }

  return await response.json(); // if your backend returns a response body
};

