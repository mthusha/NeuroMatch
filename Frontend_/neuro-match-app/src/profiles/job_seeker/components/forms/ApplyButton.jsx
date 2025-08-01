import { FaShareSquare } from 'react-icons/fa';
const ApplyButton = ({ job, openApplyForm }) => {
  if (job.isApplied) {
    return (
      <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-purple-50 text-purple-700" style={{borderRadius:"2.375rem"}}>
        <div className="flex items-center justify-center w-5 h-5 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="text-sm font-medium">Applied</span>
        <span className="text-xs bg-purple-100 px-1.5 py-0.5 rounded-full">
          {job.applied}
        </span>
      </div>
    );
  }

  return (
    <button
      onClick={() => openApplyForm(job)}
      className="flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-blue-700"
    >
      <FaShareSquare className="text-blue-500" />
      <span className="text-sm font-medium text-blue-500">Apply</span>
      <span className="text-xs bg-blue-100 px-1.5 py-0.5 rounded-full text-blue-500">
        {job.applied}
      </span>
    </button>
  );
};

export default ApplyButton;
