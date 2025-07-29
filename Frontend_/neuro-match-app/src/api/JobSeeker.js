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

