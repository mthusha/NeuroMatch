import { API_BASE_URL } from "../config";

export const uploadImage = async ({ base64Image, type, email, jwt }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/user/upload-image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         Authorization: jwt,
      },
      body: JSON.stringify({ base64Image, email, type }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Upload failed");
    }

    // console.log(`${type} uploaded successfully`);
    return data;
  } catch (err) {
    // console.error(`Error uploading ${type}:`, err.message);
    throw err;
  }
};