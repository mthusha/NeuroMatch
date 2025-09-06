import { API_BASE_URL } from "../config";

export const fetchFirstQuestionApi = async (email, jobId = null) => {
  try {
    let url = `${API_BASE_URL}/job-seeker/interview/generate_questions/${email}`;
    if (jobId) {
      url += `?jobId=${jobId}`; 
    }
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching first question:", err);
    throw err;
  }
};

export const sendAnswerApi = async (sessionId, answer, jobId = null) => {
  try {
    const body = { session_id: sessionId, answer };
    if (jobId !== null && jobId !== undefined) {
      body.job_id = jobId; 
    }
    const res = await fetch(
      `${API_BASE_URL}/job-seeker/interview/generate_questions/answer`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error sending answer:", err);
    throw err;
  }
};



export const getInterviewSessions = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/interview-session/${email}`);
    console.log("is colled")

    if (!response.ok) {
      throw new Error(`Failed to fetch sessions: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching interview sessions:", error);
    throw error; 
  }
};

export const uploadInterviewVideo = async (blob, jobId) => {
  try {
    const formData = new FormData();
    formData.append('file', blob, `${jobId}.webm`);
    formData.append('jobId', jobId);

    const res = await fetch(`${API_BASE_URL}/interview-session/upload-video`, {
      method: "POST",
      body: formData,
    });

    const result = await res.text();
    return result;
  } catch (err) {
    throw err;
  }
};

export const fetchInterviewVideo = async (jobId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/interview-session/interview-video/${jobId}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch video: ${response.statusText}`);
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Error fetching interview video:", error);
    throw error;
  }
};



export const createTempInterview = async (email, name, jobPostId, interviewData = {}) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/no-registered-interview/temp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          jobPostId,
          ...interviewData,
        }),
      }
    );
    
    return await response.json();
  } catch (error) {
    throw new Error('Failed to create temporary interview');
  }
};

