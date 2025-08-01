import React, { useEffect, useRef, useState } from 'react';
import { FaMapMarkerAlt} from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import { uploadImage } from '../../../api/Users';
import PostViewBar from './PostViewBar'
const ProfileCard = () => {
  const { user, fetchUserProfile } = useAuth();
  const [profile, setProfile] = useState(null);
  const profileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  useEffect(() => {
  const loadProfile = async () => {
    if (user?.email) {
      const data = await fetchUserProfile(user.email, user.jwt);
      setProfile(data);
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
    <div className="max-h-[1450px] overflow-auto no-scrollbar">
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

        <div className="bg-in-box from-gray-900 via-gray-800 to-gray-900 px-6 pb-6 text-white relative " style={{border:"none"}} >
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

          <div className="pt-12">
            <h2 className="text-lg font-semibold">{profile.name || 'Not Set'}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {profile.description || 'Not Set'}
            </p>
            <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
              <FaMapMarkerAlt className="h-3 w-3" />
              {profile.address || 'Not Set'}
            </p>
          </div>
        </div>
      </div>

              <PostViewBar/>
      
    </div>
  );
};

export default ProfileCard;