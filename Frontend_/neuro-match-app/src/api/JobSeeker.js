import { API_BASE_URL } from "../config";

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