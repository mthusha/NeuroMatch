import axios from "axios";
import { API_BASE_URL } from "../config";

export const createScheduledAssessment = async (data) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/schedule-assessment`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error creating scheduled assessment:", error);
    throw error;
  }
};
// services/assessmentService.js

export async function getAttemptCount(jobId) {
    const res = await fetch(
      `${API_BASE_URL}/schedule-assessment/count/${jobId}`
    );
    if (!res.ok) throw new Error("Failed to fetch attempt count");
    const data = await res.json();
    return data?.data ?? 0;
  }
  
  export async function deleteOldAssessment(jobId) {
    const res = await fetch(
      `${API_BASE_URL}/schedule-assessment/delete/${jobId}`,
      {
        method: "DELETE",
      }
    );
    if (!res.ok) throw new Error("Failed to delete assessment");
    return true;
  }
  export const completeAssessment = async (jobId) => {
    const response = await axios.post(
      `${API_BASE_URL}/schedule-assessment/complete-assessment/${jobId}`
    );
    return response.data;
  };