import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaBriefcase, FaBuilding, FaMapMarkerAlt } from 'react-icons/fa';
import LoadCamera from './LoadCamera';
import { fetchJobInfo } from './../../../../../api/AppliedJobs'; 
// import { Canvas } from '@react-three/fiber';
import { Experience } from './../../../../avatar/Experience';
import { Canvas } from "@react-three/fiber";
const AvatarPanel = ({ showCamera, eyeDetected, trackingActive, jobId, onFinish }) => {

  const [jobInfo, setJobInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // console.log(onFinish)
    if (jobId) {
      const getJobInfo = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await fetchJobInfo(jobId);
          if (data.statusCode === 200) {
            setJobInfo(data.data);
          } else {
            setError('Failed to load job info');
          }
        } catch (err) {
          setError(err.message);
          console.error('Error fetching job info:', err);
        } finally {
          setLoading(false);
        }
      };
      getJobInfo();
    }
  }, [jobId]);

  const currentDateTime = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    // <div className="hidden md:flex h-full w-full bg-gray-100 relative">
     <div className="w-full h-screen bg-gray-100 relative flex flex-col items-center justify-center">
      {/* <div className="w-full bg-white flex flex-col items-center justify-center p-4 md:p-8"> */}

        {/* job inffo */}
        <div className={`absolute top-4 w-full max-w-sm mx-auto rounded-xl p-3 z-10 
          transition-all duration-300 ease-in-out shadow-sm
          ${jobId 
            ? 'bg-indigo-50/90 text-indigo-800 border border-indigo-200/30' 
            : 'bg-purple-50/90 text-purple-800 border border-purple-200/30'
          }`}>
  
          {loading ? (
            <div className="flex items-center justify-center gap-2 p-1">
              <div className="animate-spin h-3 w-3 border border-indigo-400 border-t-transparent rounded-full"></div>
              <span className="text-xs text-indigo-600">Loading job...</span>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center gap-1 p-1 text-red-500/90">
              {/* <FaExclamationCircle className="text-xs" /> */}
              <span className="text-xs">Failed to load</span>
            </div>
          ) : jobInfo ? (
            <div className="space-y-1.5 text-center">
              <div className="flex items-center justify-center gap-2">
                <FaBriefcase className="text-indigo-500 text-sm" />
                <h3 className="text-sm font-medium">{jobInfo.jobTitle}</h3>
              </div>
              <div className="flex justify-center gap-3 text-xs text-indigo-600/90">
                <span className="flex items-center gap-1">
                  <FaBuilding className="opacity-70" />
                  {jobInfo.companyName}
                </span>
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt className="opacity-70" />
                  {jobInfo.location}
                </span>
              </div>
              <p className="text-[0.65rem] text-indigo-500/60 mt-1">{currentDateTime}</p>
            </div>
          ) : (
            <div className="space-y-1 text-center">
              <div className="flex items-center justify-center gap-2">
                <FaBriefcase className="text-purple-500 text-sm" />
                <h3 className="text-sm font-medium">Mock Interview base on your CV</h3>
              </div>
              <p className="text-xs text-purple-600/90">Practice your skills</p>
              <p className="text-[0.65rem] text-purple-500/60">{currentDateTime}</p>
            </div>
          )}
        </div>
        {/* end */}
       <div className="w-full h-full">
        <Canvas className="w-full h-full" shadows camera={{ position: [0, 0, 8], fov: 42 }}>
          <color attach="background" args={["#ececec"]} />
          <Experience />
        </Canvas>
      </div>

        {trackingActive && (
          <div className={`absolute top-4 left-4 flex items-center space-x-2 p-2 px-3 rounded-full backdrop-blur-sm transition-all duration-300${
            eyeDetected 
              ? 'bg-green-100 text-green-600 shadow-green-sm'
              : 'bg-red-100 text-red-600 shadow-red-sm'
          }`}>
            {eyeDetected ? (
              <FaEye className="text-xl animate-pulse" />
            ) : (
              <FaEyeSlash className="text-xl" />
            )}
            <span className="text-sm font-medium">
              {eyeDetected ? 'Looking at screen' : 'Please look at screen'}
            </span>
          </div>
        )}
        <LoadCamera show={showCamera} jobId={jobId} onFinish={onFinish} />
      {/* </div> */}
    </div>
  );
};

export default AvatarPanel;