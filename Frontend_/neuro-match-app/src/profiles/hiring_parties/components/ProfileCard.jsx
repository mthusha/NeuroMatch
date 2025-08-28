import React, { useEffect, useRef, useState } from 'react';
import { FaMapMarkerAlt, FaHeart, FaUserFriends } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import { uploadImage } from '../../../api/Users';
import PostViewBar from './PostViewBar'
import { fetchCompanyStats } from '../../../api/Company'; 
const ProfileCard = () => {
  const { user, fetchUserProfile } = useAuth();
  const [profile, setProfile] = useState(null);
  const profileInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const [stats, setStats] = useState({ totalFollows: 0, totalApplied: 0 });

  useEffect(() => {
  const loadProfile = async () => {
    if (user?.email) {
      const data = await fetchUserProfile(user.email, user.jwt);
      setProfile(data);
      if (data?.id) {
          const statData = await fetchCompanyStats(data.id, user.jwt);
          setStats(statData);
        }
    }
  };
  loadProfile();
}, [user, fetchUserProfile]);


  const handleProfilePicClick = () => {
    profileInputRef.current.click();
  };

  const handleCoverPicClick = () => {
    coverInputRef.current.click();
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result.split(',')[1];
        setProfile((prev) => ({
          ...prev,
          profilePictureBase64: base64Data,
        }));
  
        await uploadImage({
          base64Image: base64Data,
          type: 'profile',
          email: user.email,
          jwt: user.jwt,
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result.split(',')[1];
        setProfile((prev) => ({
          ...prev,
          coverPictureBase64: base64Data,
        }));
  
        await uploadImage({
          base64Image: base64Data,
          type: 'cover',
          email: user.email,
          jwt: user.jwt,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!profile) return <div>Loading profile...</div>;

  return (
    <div className="max-h-[850px] overflow-auto no-scrollbar">
      {/* Header */}
      <div className="relative rounded-2xl overflow-hidden shadow-xl  border-gray-700 bg-in-box">
        <div className="h-40 w-full">
          <img
             src={profile.coverPictureBase64
                ? `data:image/jpeg;base64,${profile.coverPictureBase64}`
                : "/img/df.jpg"}
            alt="Banner"
            className="w-full h-full object-cover"
            onClick={handleCoverPicClick}
          />
          <input
            type="file"
            ref={coverInputRef}
            onChange={handleCoverChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        <div className="bg-gradient-to-b from-gray-50 to-white px-6 pb-6 pt-14 relative " style={{border:"none"}} >
          <div className="absolute -top-12 left-6">
            <img
              src={profile.coverPictureBase64
                ? `data:image/jpeg;base64,${profile.profilePictureBase64}`
                : "/img/df.jpg"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              onClick={handleProfilePicClick}
            />
            <input
              type="file"
              ref={profileInputRef}
              onChange={handleProfileChange}
              accept="image/*"
              className="hidden"
            />
          </div>

        <div className="pt-2">
            <h2 className="text-2xl font-bold text-gray-800">
              {profile.name || 'Not Set'}
            </h2>
            <div className="flex items-center text-gray-500 text-sm mt-1">
              <FaMapMarkerAlt className="mr-1" />
              <span>{profile.address || 'Location not specified'}</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {profile.description || 'Not Set'}
            </p>

            <div className="flex gap-6 mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-100 px-4 py-2 rounded-xl shadow-sm">
                <FaUserFriends className="text-blue-500" />
                <span className="font-medium">{stats.totalFollows} Followers</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-100 px-4 py-2 rounded-xl shadow-sm">
                <FaHeart className="text-red-500" />
                 <span className="font-medium">{stats.totalApplied} Applied</span>
              </div>
            </div>
          </div>
        </div>
      </div>

              <PostViewBar/>
      
    </div>
  );
};

export default ProfileCard;