import React, { useState, useEffect } from "react";
import { fetchCompanyProfile, toggleFollowCompany  } from "../../../../api/JobSeeker";
import { useAuth } from "../../../../context/AuthContext";
function CompanyProfile({ companyId, onFollowChange}) {
  const [company, setCompany] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const email = user.email;

  useEffect(() => {
    const loadCompany = async () => {
      try {
        const companyData = await fetchCompanyProfile(companyId, email);
        setCompany(companyData);
        setIsFollowing(companyData.isFollowing);
      } catch (error) {
        console.error("Could not load company data", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCompany();
  }, [companyId, email]);

  const handleFollowToggle = async () => {
  try {
    const result = await toggleFollowCompany(email, companyId);
    console.log(result.message);
    setIsFollowing((prev) => !prev); 
    if (onFollowChange) {
        onFollowChange();
      }
  } catch (error) {
    console.error("Error toggling follow status:", error);
  }
};

  if (isLoading) return <div>Loading...</div>;
  if (!company) return <div>Company not found</div>;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden" style={{ marginBottom: "50px" }}>
      <div className="relative h-40 w-full" style={{ height: "7rem", position:"static" }}>
        <img
          src={
            company.coverPictureBase64
              ? `data:image/jpeg;base64,${company.coverPictureBase64}`
              : "https://source.unsplash.com/random/1200x300/?umbrella"
          }
          alt="Cover"
          className="w-full h-full object-cover rounded-t-xl"
        />

        <div className="absolute left-6" style={{position:'relative', marginTop:'-50px'}}>
          <img
            src={
              company.profilePictureBase64
                ? `data:image/jpeg;base64,${company.profilePictureBase64}`
                : "https://i.imgur.com/2yaf2wb.png"
            }
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
      </div>

      <div className="pt-12 px-6 pb-6">
        <h2 className="text-xl font-semibold text-gray-800">{company.name || "Company Name"}</h2>
        <p className="text-sm text-gray-500 mt-1">{company.description || "Company description goes here."}</p>
        <div className="text-sm text-gray-600 mt-2">📍 {company.address || "No address provided"}</div>

        <div className="mt-4">
          <button
            className={`${
              isFollowing ? "bg-gray-400 hover:bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
            } text-white px-4 py-2 rounded-full text-sm font-medium transition`}
            onClick={handleFollowToggle}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompanyProfile;
