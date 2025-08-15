import React, { useState } from 'react';
import { createScheduledAssessment } from "../../../../api/scheduledAssessmentService";
const RequestInterview = ({ onClose, jobseeker, jobPost, onScheduled }) => {
  const [interviewType, setInterviewType] = useState('technical');
  const [isJobRequirement, setIsJobRequirement] = useState(false);
  const [isCompanyCulture, setIsCompanyCulture] = useState(false);
  const [showCustomParams, setShowCustomParams] = useState(false);
  const [customText, setCustomText] = useState('');
  const [questionCount, setQuestionCount] = useState(5);
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      type: interviewType,
      numberOfQuestions: questionCount,
      deadline: endDate,
      isJobRequirement,
      isCompanyCulture,
      customParameters: showCustomParams ? customText.trim() || null : null,
      jobSeekerId: jobseeker, 
      applicantId: jobPost, 
    };

    try {
      if (onScheduled) onScheduled();
      onClose();
      await createScheduledAssessment(payload);
      // console.log(payload)
    } catch (err) {
      console.error("Failed to schedule assessment:", err);
    }
  };

  return (
    <div className="bg-white rounded-xl p-8 max-w-lg w-full shadow-lg">
      <div className="flex justify-between items-center mb-8">
      <div className="mb-6">
        <h2 className="text-xl font-medium text-gray-800 leading-tight">
          Schedule Assessment
        </h2>
        <div className="w-12 h-1 bg-indigo-500 mt-2"></div>
      </div>
   
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section>
          <label className="block text-sm font-medium text-gray-700 mb-3">Interview Type</label>
          <div className="grid grid-cols-3 gap-4">
            {['technical', 'behavioral', 'mixed'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setInterviewType(type)}
                className={`py-3 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  interviewType === type
                    ? 'bg-indigo-700 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </section>

        <section>
          <label className="block text-sm font-medium text-gray-700 mb-4">Assessment Parameters</label>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                id="job"
                type="checkbox"
                checked={isJobRequirement}
                onChange={() => setIsJobRequirement(!isJobRequirement)}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="job" className="ml-3 text-sm text-gray-800 select-none">
                Job Requirements
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="company"
                type="checkbox"
                checked={isCompanyCulture}
                onChange={() => setIsCompanyCulture(!isCompanyCulture)}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="company" className="ml-3 text-sm text-gray-800 select-none">
                Company Culture
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="custom"
                type="checkbox"
                checked={showCustomParams}
                onChange={() => setShowCustomParams(!showCustomParams)}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="custom" className="ml-3 text-sm text-gray-800 select-none">
                Custom Parameters
              </label>
            </div>
          </div>
          {showCustomParams && (
            <textarea
              placeholder="Please specify any additional custom parameters..."
              className="mt-3 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              rows={3}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
            />
          )}
        </section>

        <section>
          <label
            htmlFor="questionCount"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Number of Questions: <span className="font-semibold">{questionCount}</span>
          </label>
          <input
            type="range"
            id="questionCount"
            min="5"
            max="10"
            value={questionCount}
            onChange={(e) => setQuestionCount(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1 select-none">
            {[5, 6, 7, 8, 9, 10].map((num) => (
              <span key={num}>{num}</span>
            ))}
          </div>
        </section>

      <section className="flex items-center space-x-6">
        <div className="flex-1">
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Completion Deadline
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
            style={{
              padding:'5px',
              borderRadius:'12px'
            }}
          />
        </div>

        <div className="flex-shrink-0">
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >.
          </label>
          <button
            type="submit"
            className="btn-primary"
            // style={{borderRadius:'5px'}}
          >
            Schedule
          </button>
        </div>
      </section>

      </form>
    </div>
  );
};

export default RequestInterview;
