import React, { useState, useEffect } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { getRecommendedJobPosts } from '../../../api/Vacancy';
import { applyToJobPost } from '../../../api/AppliedJobs';
import ApplyModal from './forms/ApplyModal';
import { useAuth } from '../../../context/AuthContext';
import { likeJobPost } from '../../../api/JobSeeker';
import ApplyButton from '../components/forms/ApplyButton'
function JobFeed({ companyId, type }) {
  const [jobs, setJobs] = useState([]);
  const [userInteractions, setUserInteractions] = useState({});
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({ subject: '', description: '' });
  const openApplyForm = (job) => {
   setSelectedJob(job);
   setFormData({ subject: '', description: '' });
   setIsModalOpen(true);
  };
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getRecommendedJobPosts(user.email, companyId, type);
        if (response.statusCode === 200) {
          const formattedJobs = response.data.map(job => ({
            id: job.id,
            title: job.title,
            description: job.description,
            location: job.location,
            postedTime: job.postedOn,
            image: `data:image/png;base64,${job.posterImageBase64}`,
            likes: job.likes,
            applied: job.applies,
            salary: `Rs. ${job.salaryFrom.toLocaleString()} - ${job.salaryTo.toLocaleString()}`,
            requirements: job.requirements,
            suggestionType: job.suggestionsType,
            postedBy: job.postedBy,
            profileImageBase64: `data:image/png;base64,${job.profileImageBase64}`,
            isLiked: job.isLiked,
            isApplied: job.isApplied
          }));
          setJobs(formattedJobs);
        } else {
          console.warn('Unexpected API response:', response);
        }
      } catch (error) {
        console.error('Error fetching recommended jobs:', error);
      }
    };

    fetchJobs();
  }, [user.email, companyId, type]);

  const handleApplySubmit = async (e) => {
  e.preventDefault();
  try {
    const payload = {
      jobPostId: selectedJob.id,
      email: user.email,
      ...formData,
    };
    const response = await applyToJobPost(payload);
    if (response.statusCode === 201) {
      // alert("Successfully applied!");
      const updatedJobs = jobs.map(job => 
        job.id === selectedJob.id 
          ? { ...job, isApplied: true, applied: job.applied + 1 } 
          : job
      );
      setJobs(updatedJobs);
      setIsModalOpen(false);
    } else {
      alert("Failed to apply.");
    }
  } catch (error) {
    console.error("Error applying:", error);
    alert("Server error while applying.");
  }
};

  const toggleInteraction = async (jobId, type) => {
  const hasInteracted = userInteractions[jobId]?.[type] || false;
  setJobs(prev =>
    prev.map(job =>
      job.id === jobId
        ? {
            ...job,
            [type]: hasInteracted ? job[type] - 1 : job[type] + 1,
            isLiked: !hasInteracted
          }
        : job
    )
  );
  setUserInteractions(prev => ({
    ...prev,
    [jobId]: {
      ...prev[jobId],
      [type]: !hasInteracted
    }
  }));

  if (type === 'likes' && !hasInteracted) {
    try {
      const response = await likeJobPost(user.email, jobId);
      if (response.statusCode !== 200) {
        console.warn("Like API failed:", response.message);
      }
    } catch (error) {
      console.error("Error calling like API:", error);
    }
  }
};

    const getSuggestionBadge = (type) => {
    const types = {
      following: {
        text: 'Following',
        color: 'bg-blue-50 text-blue-700 border border-blue-200',
        icon: '👥'
      },
      skills: {
        text: 'Skills Match',
        color: 'bg-green-50 text-green-700 border border-green-200',
        icon: '🛠️'
      },
      trending: {
        text: 'Trending',
        color: 'bg-purple-50 text-purple-700 border border-purple-200',
        icon: '📈'
      },
      popular: {
        text: 'Popular',
        color: 'bg-red-50 text-red-700 border border-red-200',
        icon: '🔥'
      },
      recommended: {
        text: 'Recommended',
        color: 'bg-gray-50 text-gray-700 border border-gray-200',
        icon: '⭐'
      },
      nothing: {
        text: '',
        color: '',
        icon: ''
      }
    };

    return types[type?.toLowerCase()] || types['nothing'];
  };


  return (
    <div className="job-feed-seeker">
      {jobs.map(job => {
        const badge = getSuggestionBadge(job.suggestionType);
        // const interaction = userInteractions[job.id] || {};
        return (
         <div className="job-card bg-white rounded-lg overflow-hidden duration-300 relative" key={job.id}>  
            <div className="flex items-center justify-between mb-3 suggest_box ">
              <div className="flex items-center gap-3">
              {job.profileImageBase64 && job.profileImageBase64.includes('A')
               ? (
                <img
                  src={job.profileImageBase64}
                  alt="Posted by"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-sm">
                  {job.postedBy?.charAt(0).toUpperCase() || 'C'}
                </div>
              )}


                <div>
                  <p className="font-semibold text-sm text-gray-800 text-black">{job.postedBy}</p>
                  <p className="text-xs text-gray-500">{job.postedTime}</p>
                </div>
              </div>
              <div
                className={`inline-flex items-center text-xs font-medium px-3 py-1 rounded-full ${badge.color}`}
              >
                <span className="mr-1.5">{badge.icon}</span>
                {badge.text}
              </div>
            </div>
            <div className="job-details">
              {/* <p
              style={{
                marginTop:"0",
                fontSize:'11px'
              }}
              >{job.postedTime}</p> */}
              <div className='post-detail-box'>
                <div className="post-text-box">
              <h3>{job.title}</h3>
                  
                  <p className="job-description">{job.description}</p>
                  <div className="job-meta">
                    <p><strong>📍 Location:</strong> {job.location}</p>
                    <p><strong>💰 Salary:</strong> {job.salary}</p>
                  </div>
                </div>


                <div className='post-img-box'>
                  <img src={job.image} alt="Job Visual" className="job-image-j" />
                </div>
              </div>


              <div className="job-actions">
                <button
                  onClick={() => toggleInteraction(job.id, 'likes')}
                  style={{ color: job.isLiked ? 'blue' : 'black', display: 'flex', alignItems: 'center', gap: '6px' }}
                  title="Like"
                >
                  <FaThumbsUp />
                  <span>{job.likes}</span>
                </button>
                <ApplyButton job={job} openApplyForm={openApplyForm} />
                {/* <button
                   onClick={() => openApplyForm(job)}
                  style={{ color: job.isApplied ? 'purple' : 'black', display: 'flex', alignItems: 'center', gap: '6px' }}
                  title="Applied"
                >
                  <FaShareSquare />
                  <span>{job.applied}</span>
                </button> */}
              </div>
            </div>
            
          </div>
        );
      })}
      <ApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={selectedJob}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleApplySubmit}
      />
    </div>
  );
}

export default JobFeed;
