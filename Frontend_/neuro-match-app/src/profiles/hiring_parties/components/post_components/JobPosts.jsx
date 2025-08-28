import React, { useEffect, useState } from 'react';
import { getAppliedJobUserUI } from '../../../../api/AppliedJobs';
import { deleteJobPost } from '../../../../api/Company';

const JobPosts = ({ posts, onDeleteSuccess }) => {
  const [appliedData, setAppliedData] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchAppliedData = async () => {
      for (const post of posts) {
        if (post.id) {
          const data = await getAppliedJobUserUI(post.id);
          if (data) {
            setAppliedData(prev => ({
              ...prev,
              [post.id]: data
            }));
          }
        }
      }
    };
    fetchAppliedData();
  }, [posts]);

  const handleDelete = async (jobId) => {
    if (isDeleting) return;
    try {
      setIsDeleting(true);
      const response = await deleteJobPost(jobId);
      onDeleteSuccess();
      if (response.statusCode !== 200) {
        console.error('Failed to delete job post:', response.message);
      }
    } catch (error) {
      console.error('Error deleting job post:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="">
      {/* <h3 className="feed-title text-xl font-bold text-indigo-600 flex items-center gap-2">
        Recent Job Posts
      </h3> */}

      <div className="grid gap-6">
        {posts.map((post, index) => {
          const appliedInfo = appliedData[post.id] || {};
          return (
            <div
              key={index}
              className="job-card group relative rounded-lg shadow-md border bg-white"
            >
              <div className="flex items-center gap-3 p-4 -b">
                {post.profileImageBase64 ? (
                  <img
                    className="w-10 h-10 rounded-full object-cover border"
                    src={post.profileImageBase64}
                    alt={post.postedBy || 'Company Logo'}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                    {post.postedBy ? post.postedBy.charAt(0) : 'C'}
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {post.postedBy || 'Unknown Company'}
                  </h4>
                  <span className="text-xs text-gray-500">
                    {post.postedOn || 'Recently Posted'}
                  </span>
                </div>
              </div>

              <div className='job-details'>
              <div className="post-detail-box">
                <div className="post-text-box">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {post.title || 'No Title'}
                    </h3>

                    <button
                      onClick={() => handleDelete(post.id)}
                      disabled={isDeleting}
                      className="text-red-500 hover:text-red-700 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                      aria-label="Delete job post"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 
                          0116.138 21H7.862a2 2 0 
                          01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 
                          1 0 00-1-1h-4a1 1 0 
                          00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>

                  <div className="mt-3 text-gray-600 text-sm leading-relaxed">
                    {post.description || 'No description provided'}
                  </div>

                  <div className="mt-4 space-y-2 text-sm">
                    <p><span className="font-medium">📍 Location:</span> {post.location || 'Remote'}</p>
                    <p><span className="font-medium">💰 Salary:</span> {post.salaryFrom && post.salaryTo
                      ? `Rs. ${post.salaryFrom.toLocaleString()} - ${post.salaryTo.toLocaleString()}`
                      : 'Not specified'}
                    </p>
                  </div>

                  {appliedInfo.profilePictureBase64 && (
                    <div className="mt-4 flex items-center -space-x-2">
                      {appliedInfo.profilePictureBase64.slice(0, 3).map((imgBase64, idx) => (
                        <img
                          key={idx}
                          className="w-8 h-8 rounded-full border-2 border-white shadow-sm object-cover"
                          src={`data:image/jpeg;base64,${imgBase64}`}
                          alt={`Applicant ${idx + 1}`}
                        />
                      ))}
                      {appliedInfo.totalCount > 3 && (
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-200 text-indigo-800 text-xs font-semibold border-2 border-white shadow-sm">
                          +{appliedInfo.totalCount - 3}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="post-img-box">
                  {post?.posterImageBase64 ? (
                    <img
                      className="job-image-j"
                      src={`${post.posterImageBase64}`}
                      alt={post.title || 'Job Image'}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center p-6">
                      <span className="font-bold text-lg text-indigo-600">WE ARE HIRING</span>
                      <span className="text-gray-500 text-sm mt-2">No Banner</span>
                    </div>
                  )}
                </div>
              </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobPosts;
