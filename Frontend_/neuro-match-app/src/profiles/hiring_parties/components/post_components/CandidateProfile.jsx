import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiMail, FiMapPin, FiBriefcase, FiAward,FiChevronDown  } from "react-icons/fi";
import { useAuth } from "../../../../context/AuthContext";
import CvConfirmationModal from "./../../../job_seeker/components/forms/CvConfirmationModal";
import { fetchCvData } from "../../../../api/JobSeeker";
import { updateCandidateStatus } from '../../../../api/AppliedJobs';
const CandidateProfile = ({ candidate, goBack, jwt }) => {
  const { fetchUserProfile } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [cvData, setCvData] = useState(null);
  const [loadingCv, setLoadingCv] = useState(false);
  const [status, setStatus] = useState(candidate.status || 'shortlisted');


  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        const data = await fetchUserProfile(candidate.email, jwt);
        setProfile(data);
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProfile();
  }, [candidate, jwt, fetchUserProfile]);

  useEffect(() => {
    setStatus(candidate.status || 'shortlisted');
  }, [candidate]);

    const handleViewCv = async () => {
    try {
      setLoadingCv(true);
      const data = await fetchCvData(candidate.email);
      setCvData(data);
      setCvModalOpen(true);
    } catch (error) {
      alert(error.message || "Error fetching CV");
    } finally {
      setLoadingCv(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    const oldStatus = status;
    setStatus(newStatus);
    try {
      await updateCandidateStatus(candidate.id, newStatus, jwt);
    } catch (err) {
      setStatus(oldStatus); 
    }
  };



  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const skills = profile?.userSkillsMap?.user_skills || [];

  return (
    <div className="bg-white rounded-xl overflow-hidden transition-all duration-300 border border-gray-200 rounded-xl p-1 shadow-sm hover:shadow-md transition-all group hover:border-indigo-200">
      {/* Cover Image */}
      <div className="relative from-indigo-500 "
      style={{height:'8rem', backgroundColor:'transparent'}}>
        {profile.coverPictureBase64 ? (
          <img
            src={`data:image/jpeg;base64,${profile.coverPictureBase64}`}
            alt="Cover"
            className="w-full h-full object-cover opacity-90"
            style={{borderRadius:'10px 10px 0px 0px'}}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500"></div>
        )}

        <button
          onClick={goBack}
          className="absolute top-4 left-4 flex items-center gap-1 bg-white/90 px-3 py-1.5 rounded-full shadow-md hover:bg-white transition-all duration-200 group"
        >
          <FiArrowLeft className="text-gray-700 group-hover:text-indigo-600 transition-colors" />
          <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
            Back
          </span>
        </button>

        {/* Profile Picture */}
        <div className="absolute -bottom-16 left-6 transform  transition-transform duration-300">
          <div className="relative">
            {profile.profilePictureBase64 ? (
              <img
                src={`data:image/jpeg;base64,${profile.profilePictureBase64}`}
                alt={profile.name}
                className="h-32 w-32 rounded-full border-4 border-white shadow-lg object-cover "
              />
            ) : (
              <div className="h-32 w-32 rounded-full bg-indigo-100 flex items-center justify-center text-3xl font-bold text-indigo-600 border-4 border-white shadow-lg">
                {profile.name?.charAt(0)}
              </div>
            )}
            {profile.NeuroScore && (
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-bold h-8 w-8 rounded-full flex items-center justify-center">
                  {profile.NeuroScore}%
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-3 pt-20">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{profile.name}</h2>
            <div className="flex items-center gap-4 mt-2">
              {profile.job && (
                <span className="flex items-center text-gray-600 text-sm">
                  <FiBriefcase className="mr-1 text-indigo-500" />
                  {profile.job}
                </span>
              )}
              {profile.location && (
                <span className="flex items-center text-gray-600 text-sm">
                  <FiMapPin className="mr-1 text-indigo-500" />
                  {profile.location}
                </span>
              )}
              {profile.email && (
                <span className="flex items-center text-gray-600 text-sm">
                  <FiMail className="mr-1 text-indigo-500" />
                  {profile.email}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-5 flex gap-3 items-center">
          <button 
          onClick={handleViewCv}
          className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full hover:from-indigo-600 hover:to-purple-700 text-xs font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-1.5">
            <FiAward className="text-white text-sm" />
            View CV
          </button>

          <div className="relative">
            <select
              value={status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className={`appearance-none px-6 py-2 pr-8 rounded-full text-xs font-medium border shadow-sm transition-all duration-300 cursor-pointer
                ${status  === 'pending' ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100' : 
                  status === 'rejected' ? 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100' :
                  status === 'reviewed' ? 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100' :
                  'bg-green-50 border-green-200 text-green-700 hover:bg-green-100'}`}
            >
              <option value="shortlisted" className="">Shortlisted</option>
              <option value="pending" className="">Pending</option>
              <option value="reviewed" className="">In Review</option>
              <option value="rejected" className="">Rejected</option>
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-current pointer-events-none" />
          </div>
        </div>

        {cvModalOpen && cvData && (
        <CvConfirmationModal
          data={cvData}
          onClose={() => setCvModalOpen(false)}
          showConfirmButton={false}
        //   onConfirm={() => {
        //     // alert("CV confirmed!");
        //     setCvModalOpen(false);
        //   }}
          isLoading={false}
        />
      )}

        <div className="mt-6 space-y-5">
          {(profile.bio || profile.description) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {profile.bio && (
                <div className="bg-gray-50/80 p-3 rounded-lg border border-gray-200/80 h-full">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">About</h3>
                  <p className="text-gray-700 text-sm leading-snug line-clamp-5 hover:line-clamp-none transition-all">
                    {profile.bio}
                  </p>
                </div>
              )}
      
              {profile.description && (
                <div className="bg-gray-50/80 p-3 rounded-lg border border-gray-200/80 h-full">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Professional Summary</h3>
                  <p className="text-gray-700 text-sm leading-snug line-clamp-5 hover:line-clamp-none transition-all">
                    {profile.description}
                  </p>
                </div>
              )}
            </div>
          )}

          {skills.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-[11px] bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-700 rounded-full border border-indigo-100/70 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {profile.neuroScore && (
            <div className="mt-5 bg-gradient-to-br from-indigo-50/80 to-purple-50/80 p-4 rounded-lg border border-indigo-100/70">
              <div className="flex items-start gap-2.5">
                <div className="bg-indigo-100/80 p-1.5 rounded-md mt-0.5">
                  <FiAward className="text-indigo-600 text-sm" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1.5">
                    <div>
                      <h3 className="text-xs font-semibold text-gray-700">Neuro Score</h3>
                      <p className="text-[11px] text-gray-500/90">AI role compatibility</p>
                    </div>
                    <span className="text-base font-bold text-indigo-600">{profile.neuroScore}%</span>
                  </div>
          
                  <div className="w-full bg-gray-200/70 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-purple-500"
                      style={{ width: `${profile.neuroScore}%` }}
                    ></div>
                  </div>
          
                  <p className="text-[11px] text-gray-500/90 mt-2 leading-tight">
                    Top <span className="font-medium text-indigo-600">{Math.round(100 - profile.neuroScore)}%</span> candidate for AI research alignment
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {loadingCv && (
        <div className="fixed inset-0 bg-black/80 flex flex-col justify-center items-center z-50 text-white backdrop-blur-sm">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
          <p className="mt-4 text-sm font-medium">Loading CV...</p>
        </div>
      )}
    </div>
  );
};

export default CandidateProfile;