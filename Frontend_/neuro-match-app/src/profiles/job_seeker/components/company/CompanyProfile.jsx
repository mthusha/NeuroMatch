import React, { useState, useEffect } from "react";
import { fetchCompanyProfile, toggleFollowCompany } from "../../../../api/JobSeeker";
import { useAuth } from "../../../../context/AuthContext";
import { FaMapMarkerAlt, FaHeart, FaUserPlus } from "react-icons/fa";
import { fetchCompanyStats } from "../../../../api/Company"; 
function CompanyProfile({ companyId, onFollowChange }) {
  const [company, setCompany] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [stats, setStats] = useState({ totalFollows: 0, totalApplied: 0 }); 
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const email = user.email;

  useEffect(() => {
    const loadCompany = async () => {
      try {
        const companyData = await fetchCompanyProfile(companyId, email);
        setCompany(companyData);
        setIsFollowing(companyData.isFollowing);
        const statData = await fetchCompanyStats(companyId);
        setStats(statData);
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
      setIsFollowing((prev) => {
        const newState = !prev;
        setStats((s) => ({
          ...s,
          totalFollows: newState ? s.totalFollows + 1 : s.totalFollows - 1,
        }));
        return newState;
      });
      if (onFollowChange) onFollowChange();
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!company) return <div>Company not found</div>;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden" style={{ marginBottom: "50px" }}>
      {/* Cover Image */}
      <div className="relative h-40 w-full cursor-pointer">
        <img
          src={
            company.coverPictureBase64
              ? `data:image/jpeg;base64,${company.coverPictureBase64}`
              : "https://source.unsplash.com/random/1200x300/?corporate"
          }
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white px-6 pb-6 pt-14 relative">
        <div className="absolute -top-12 left-6">
          <img
            src={
              company.profilePictureBase64
                ? `data:image/jpeg;base64,${company.profilePictureBase64}`
                : "https://i.imgur.com/2yaf2wb.png"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>

        <div className="pt-2">
          <h2 className="text-2xl font-bold text-gray-800">
            {company.name || "Company Name"}
          </h2>
          <div className="flex items-center text-gray-500 text-sm mt-1">
            <FaMapMarkerAlt className="mr-1" />
            <span>{company.address || "No address provided"}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {company.description || "Company description goes here."}
          </p>

          <div className="flex items-center gap-4 mt-4 flex-wrap">
            <button
              onClick={handleFollowToggle}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition text-white shadow-md ${
                isFollowing
                  ? "bg-gray-500 hover:bg-gray-600"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <FaUserPlus className="text-white" />
              {isFollowing ? "Following" : "Follow"}
              <span className="ml-1 bg-transparent text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                 {stats.totalFollows}
              </span>
            </button>

            <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-100 px-4 py-2 rounded-full shadow-sm">
              <FaHeart className="text-red-500" />
               <span className="font-medium">{stats.totalApplied} Applied</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyProfile;
