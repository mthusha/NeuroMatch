import { useEffect, useRef, useState } from 'react';
import { FaMapMarkerAlt, FaEllipsisH } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import { uploadImage } from '../../../api/Users';
import { useNavigate } from 'react-router-dom';
import FullscreenLoader from './../../comman/FullscreenLoader'

const ProfileCard = () => {
  const { user, fetchUserProfile } = useAuth();
  const [profile, setProfile] = useState(null);
  const profileInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const [loadingInterview, setLoadingInterview] = useState(false);
  const navigate = useNavigate();

 useEffect(() => {
  const loadProfile = async () => {
    if (user?.email) {
      const data = await fetchUserProfile(user.email, user.jwt);
      setProfile(data);
    }
  };
  loadProfile();
}, [user, fetchUserProfile]);

const handleNeuroSyncClick = () => {
    setLoadingInterview(true);
    setTimeout(() => {
      navigate('/seeker-interview');
    }, 2000);
  };


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
        });
      };
      reader.readAsDataURL(file);
    }
  };
  


  if (!profile) return <div>Loading profile...</div>;


  return (
    <>
      {loadingInterview && <FullscreenLoader />}
    <div className="profile-card">
      <div
        className="profile-banner"
        style={{
          backgroundImage: profile.coverPictureBase64
            ? `url('data:image/jpeg;base64,${profile.coverPictureBase64}')`
            : 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '120px',
          position: 'static',
          cursor: 'pointer',
          zIndex: 1 
        }}
        onClick={handleCoverPicClick}
      >
        <input
          type="file"
          ref={coverInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleCoverChange}
        />

        {/* Profile Avatar */}
        <img
          src={`data:image/jpeg;base64,${profile.profilePictureBase64}`}
          alt="Profile"
          className="profile-avatar"
          style={{
            borderRadius: '50%',
            width: '100px',
            height: '100px',
            position: 'relative',
            // bottom: '-50px',
            // left: '20px',
            border: '4px solid white',
            cursor: 'pointer',
            zIndex: 10 
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // e.stopPropagation()
            handleProfilePicClick();
          }}
        />
        <input
          type="file"
          ref={profileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleProfileChange}
        />
      </div>
      
      <div className="profile-content">
      
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
        {profile.name}
      </h1>
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <div>
      <p className="text-gray-500 text-sm mb-1">
        {profile.job || "Unknown"}
        {profile.jobRole ? ` | ${profile.jobRole}` : ""}
      </p>

      <p className="flex items-center text-gray-500 text-sm mb-4">
        <FaMapMarkerAlt className="text-red-500 mr-1" />{" "}
        {profile.location || "Not set"}
      </p>
      </div>
        <a href="/neuro-profile" className="contact-info"><i class="fas fa-link" style={{marginRight: 5}}></i></a>
       
      </div>
        <div className="action-buttons">
         <button className="btn-primary" onClick={handleNeuroSyncClick} disabled={loadingInterview}>NeuroSync Interview</button>
          <button  onClick={() => navigate("/interview-past")} className="btn-secondary">View Submissions</button>
          <button className="more-btn"><FaEllipsisH /></button>
        </div>

        <div className="experience-cards">
          <div className="exp-card">
            <p>{profile.bio || 'Bio not set'}.</p>
          </div>
          <div className="exp-card">
            <p>{profile.description || 'Description not set'}.</p>
          </div>
        </div>

        <div className="profile-level">
          <div className="level-header">
            <h3 className="level-title"> NeuroCompatibility Score: {profile.neuroScore || 'N/A'}%</h3>
          </div>
          <div className="progress-bar">
            <div className="progress-fill"style={{ width: `${profile.neuroScore || 0}%`}} ></div>
          </div>
          <p className="level-description">This talent ranks in the top 5% for cognitive alignment with cutting-edge AI research roles based on our neural mapping algorithms.</p>
        </div>
      </div>
    </div>
     </>
  );
};

export default ProfileCard;