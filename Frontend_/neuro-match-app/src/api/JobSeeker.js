import { API_BASE_URL } from "../config";
import axios from "axios";

const fetchSuggestedCandidates = async (jobPostId) => {
  const res = await fetch(
    `${API_BASE_URL}/job-seeker/recommend/job-seekers/${jobPostId}`
  );
  const json = await res.json();

  if (!res.ok || json.statusCode !== 200) {
    throw new Error(
      json.statusMessage || "Failed to fetch suggested candidates"
    );
  }

  const candidates = json.data.map((user) => ({
    _id: user.id,
    name: user.name,
    experience: user.bio || "N/A",
    profileImage: user.profilePictureBase64
      ? `data:image/png;base64,${user.profilePictureBase64}`
      : "",
    skills: user.userSkillsMap?.job_skills || [],
    matchScore: user.neuroScore || "N/A",
  }));

  return candidates;
};

export default fetchSuggestedCandidates;


export async function fetchCompanyProfile(companyId, email) {
  const url = `${API_BASE_URL}/company/${companyId}?email=${email}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.statusCode === 200) {
      return data.data;
    } else {
      throw new Error(data.statusMessage || "Failed to fetch company profile");
    }
  } catch (error) {
    console.error("Error in fetchCompanyProfile:", error);
    throw error;
  }
}


export const toggleFollowCompany = async (email, companyId) => {
  const response = await axios.get(`${API_BASE_URL}/job-seeker/follow`, {
    params: { email, companyId },
  });
  return response.data;
};

export const likeJobPost = async (email, jobPostId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/job-seeker/like`, null, {
      params: { email, jobPostId },
    });
    return response.data;
  } catch (error) {
    console.error("Error liking job post:", error);
    return { statusCode: 500, message: "Server Error" };
  }
};

export async function fetchCvData(email) {
  try {
    const res = await fetch(`${API_BASE_URL}/job-seeker/cv/${email}`);
    const json = await res.json();

    if (json.statusCode === 200 && json.data) {
      return JSON.parse(json.data);
    } else {
      throw new Error(json.statusMessage || "Failed to load CV data");
    }
  } catch (err) {
    console.error("Error fetching CV:", err);
    throw err;
  }
}

export const fetchJobSeekerSummary = async (email, token) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/job-seeker/job-seeker-summery/${email}`,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data; 
  } catch (error) {
    console.error("Failed to fetch job seeker summary:", error);
    throw error;
  }
};


export const fetchJobSeekerScore = async (id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/job-seeker/get-score-only/${encodeURIComponent(id)}`
    );

    if (response.data && response.data.statusCode === 200) {
      return response.data.data;
    }
    throw new Error(response.data?.statusMessage || "Failed to fetch score");
  } catch (error) {
    console.error("Error fetching score:", error);
    throw error;
  }
};


export const fetchInterviewSessionsByApplicant = async (applicantId, jwt) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/interview-session/by-applicant/${applicantId}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (data.statusCode === 200) {
      return data.data || [];
    }
    throw new Error(data.statusMessage || "Failed to fetch interview sessions");
  } catch (err) {
    console.error("Error fetching interview sessions:", err);
    throw err;
  }
};


