import React, { useEffect, useState, useRef } from "react";
import CandidateCard from './CandidateCard';
import CandidateProfile from './CandidateProfile';
import { getApplicantsByJobPostId } from '../../../../api/AppliedJobs';
import { Files } from "lucide-react";
import CVResultsModal from './../pop/CVResultsModal';
import { checkMultipleCVs } from '../../../../api/JobSeeker';
import { Mail } from "lucide-react"; 
import TempCandidateCard from './TempCandidateCard';
// import { FiFileText } from "react-icons/fi";
const AppliedCandidates = ({ vacancies, selectedVacancy, onSelectVacancy }) => {
  const [applications, setApplications] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const scrollContainerRef = useRef(null);
  const [cvResults, setCvResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showTemp, setShowTemp] = useState(false); 


  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click(); 
  };

 const handleFilesSelected = async (event) => {
  const files = Array.from(event.target.files);
  if (!files.length || !selectedVacancy) return;

  try {
    const result = await checkMultipleCVs(files, selectedVacancy.id);
    setCvResults(result);
    setShowModal(true);
  } catch (err) {
    console.error("Error uploading CVs:", err);
    alert("Failed to process CVs. See console for details.");
  }
};


  useEffect(() => {
    const fetchApplications = async () => {
      if (!selectedVacancy) return;
      const res = await getApplicantsByJobPostId(selectedVacancy.id);
      if (res.statusCode === 201) {
        setApplications(res.data);
      } else {
        setApplications([]);
        console.warn("Unexpected response:", res);
      }
    };

    fetchApplications();
  }, [selectedVacancy]);



  const filteredApplications = selectedStatus === 'all'
    ? applications
    : applications.filter(app => app.status === selectedStatus);

  return (
    <div>
    <div class="flex justify-between items-center mb-4">
        <h2 class="flex items-center gap-2 text-xs font-bold text-indigo-700"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles w-6 h-6 text-indigo-500" aria-hidden="true"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>Applied Candidates</h2>
      {/* <div class="text-xs text-gray-500">6 applications</div> */}
    </div>
    <div className="bg-white rounded-2xl  p-4 border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
         {!selectedVacancy &&  (
          <h2 className="text-xl font-bold text-indigo-600 flex items-center gap-2"> </h2> 
        )}
        {selectedVacancy &&  (
          <>
          <div style={{display:'flex'}}>
            <button
              className="flex items-center gap-2 text-xs text-indigo-600 font-semibold px-4 py-2 rounded-xl hover:bg-indigo-50"
              onClick={handleClick}
            >
              <Files size={16} className="text-indigo-600" />
              Bulk Add
            </button>
            <input
                type="file"
                accept="application/pdf"
                multiple
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFilesSelected}
            />
             <button
               className="flex items-center gap-2 text-xs text-indigo-600 font-semibold px-4 py-2 rounded-xl hover:bg-indigo-50"
               onClick={() => setShowTemp(prev => !prev)}
             >
               {showTemp ? <i class="fas fa-brain mr-2" style={{margin:'0'}}></i> : <Mail size={16} className="text-indigo-600" /> }  
               {showTemp ? "Neuro apply" : "Mail apply"}
             </button>
            </div>
           
         </>
          )}
        {/* <h2 class="text-2xl font-semibold text-indigo-600 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles w-6 h-6 text-indigo-500" aria-hidden="true"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>Applied Candidates</h2> */}
        <div className="flex gap-3">
          <select
            className="text-xs border border-gray-200 rounded-xl px-3 py-1.5 focus:ring-1 focus:ring-indigo-400"
            value={selectedVacancy?.id || ''}
            onChange={(e) => {
              const vacancy = vacancies.find(v => v.id.toString() === e.target.value);
              onSelectVacancy(vacancy || null);
            }}
          >
            <option value="">🎓 Select a vacancy</option>
            {vacancies.map(vacancy => (
              <option key={vacancy.id} value={vacancy.id}>
                {vacancy.title}
              </option>
            ))}
          </select>

          <select
            className="text-xs border border-gray-200 rounded-xl px-3 py-1.5 focus:ring-1 focus:ring-indigo-400"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            disabled={!selectedVacancy}
          >
            <option value="all">All Applications</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="rejected">Rejected</option>
            <option value="shortlisted">Shortlisted</option>
          </select>
        </div>
      </div>

      {selectedVacancy ? (
        <div
          ref={scrollContainerRef}
          className="space-y-4 no-scrollbar"
          style={{ maxHeight: '700px', overflowY: 'auto' }}
        >
          {selectedCandidate ? (
            <CandidateProfile
              candidate={selectedCandidate}
              goBack={() => setSelectedCandidate(null)}
              scrollContainerRef={scrollContainerRef}
            />
          ) : (
            <>
              {showTemp ? (
                filteredApplications.filter(app => app.temp).length > 0 ? (
                  filteredApplications
                    .filter(app => app.temp)
                    .map((application, index) => (
                      <div key={index} className="pb-4 last:border-b-0">
                        <TempCandidateCard
                          candidate={application}
                          applicationStatus={application.status}
                        />
                      </div>
                    ))
                ) : (
                  <div className="flex flex-col justify-center items-center h-64">
                    <img
                      src="/static/img/file-not-found.png"
                      alt="No temp candidates"
                      className="w-24 h-24 mb-4"
                    />
                    <p className="text-sm text-gray-500 text-center">
                      No temporary candidates found.
                    </p>
                  </div>
                )
                    ) : (
                filteredApplications.filter(app => !app.temp).length > 0 ? (
                  filteredApplications
                    .filter(app => !app.temp)
                    .map((application, index) => (
                      <div key={index} className="pb-4 last:border-b-0">
                        <CandidateCard
                          candidate={{
                            name: application.name,
                            email: application.email,
                            recommended: application.recommended,
                            score: application.score,
                            skill: application.skill,
                            profilePictureBase64: application.profilePictureBase64,
                            bio: application.bio,
                            description: application.description,
                            subject: application.subject,
                            isTemp: application.temp
                          }}
                          applicationStatus={application.status}
                          applicationDate={application.appliedDate}
                          showActionButton={true}
                          actionText="View Application"
                          onClick={() => setSelectedCandidate(application)}
                        />
                      </div>
                    ))
                ) : (
                  <div className="flex flex-col justify-center items-center h-64">
                    <img
                      src="/static/img/file-not-found.png"
                      alt="No candidates"
                      className="w-24 h-24 mb-4"
                    />
                    <p className="text-sm text-gray-500 text-center">
                      No candidates found.
                    </p>
                  </div>
                )
              )}
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-64">
          <img
            src="/static/img/placeholder-image.png"
            alt="Select a vacancy"
            className="w-24 h-24 mb-4"
          />
          <p className="text-sm text-gray-500 text-center">
            Please select a vacancy to view applications
          </p>
        </div>
      )}

    </div>
    {showModal && <CVResultsModal results={cvResults} jobPostId={selectedVacancy?.id}  onClose={() => setShowModal(false)} />}

    </div>
  );
};

export default AppliedCandidates;
