import { API_BASE_URL } from "../config";
export const fetchFirstQuestionApi = async (email) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/job-seeker/interview/generate_questions/${email}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching first question:", err);
    throw err;
  }
};

export const sendAnswerApi = async (sessionId, answer) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/job-seeker/interview/generate_questions/answer`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, answer }),
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

