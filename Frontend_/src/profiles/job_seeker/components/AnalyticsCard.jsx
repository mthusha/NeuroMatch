import React, { useRef, useState } from 'react';
import { uploadFileToApi,sendProcessedData   } from '../../../api/UploadCV';
import { useAuth } from '../../../context/AuthContext';
import ReactDOM from 'react-dom';
import { CvConfirmationModal } from './forms/CvConfirmationModal'
const AnalyticsCard = () => {
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [parsedData, setParsedData] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    setIsLoading(true);
    const result = await uploadFileToApi(file);
    setIsLoading(false);
  
    if (result.success) {
      setParsedData(result.data);
      setShowConfirmation(true);
    } else {
      console.error('Upload failed:', result.error);
      alert(`Error: ${result.error}`);
    }
  
    event.target.value = '';
  };

  const handleConfirmSend = async () => {
    setIsLoading(true);
    const sendResult = await sendProcessedData(parsedData, user.jwt, user.email );
    setIsLoading(false);
    
    if (sendResult.success) {
      // alert('Data successfully saved!');
    } else {
      alert(`Error saving data: ${sendResult.error}`);
    }
    setShowConfirmation(false);
  };

  // const DataSection = ({ title, children }) => (
  //   <div className="mb-6">
  //     <h4 className="text-lg font-semibold text-indigo-700 mb-2 border-b pb-1">{title}</h4>
  //     {children}
  //   </div>
  // );
  

  return (
    <div className="sidebar-card">
      <h3>Neural Activity Insights</h3>
      <p>Your profile shows strong synaptic connections in machine learning and cognitive science domains.</p>
      <div className="chart-placeholder">
        {isLoading ? (
          <>
           <svg viewBox="0 0 500 100" className="chart-svg animate-pulse">
              <polyline
               fill="none"
               stroke="#c7d2fe"  
               strokeWidth="2"
               points="0,70 50,60 100,65 150,60 200,70 250,60 300,65 350,60 400,70 450,60 500,65"
             />
          </svg>
          </>
        ) : (
          <>
            <div className="chart-circle"></div>
            <div class="line-chart">
              <svg viewBox="0 0 500 100" class="chart-svg">
                <polyline 
                  fill="none"
                  stroke="#6366f1"
                  stroke-width="2"
                  points="0,40 50,60 100,30 150,50 200,70 250,40 300,60 350,20 400,50 450,80 500,10"
                />
                <circle cx="0" cy="40" r="3" fill="#6366f1"/>
                <circle cx="50" cy="60" r="3" fill="#6366f1"/>
                <circle cx="100" cy="30" r="3" fill="#6366f1"/>
                <circle cx="150" cy="50" r="3" fill="#6366f1"/>
                <circle cx="200" cy="70" r="3" fill="#6366f1"/>
                <circle cx="250" cy="40" r="3" fill="#6366f1"/>
                <circle cx="300" cy="60" r="3" fill="#6366f1"/>
                <circle cx="350" cy="20" r="3" fill="#6366f1"/>
                <circle cx="400" cy="50" r="3" fill="#6366f1"/>
                <circle cx="450" cy="80" r="3" fill="#6366f1"/>
                <circle cx="500" cy="10" r="3" fill="#6366f1"/>
              </svg>
            </div>
          </>
        )}
      </div>
      <p>87% match with trending opportunities in neuro-inspired computing.</p>
      <button className="follow-btn" onClick={handleButtonClick}>Update Neural Metrics</button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="application/pdf"
        onChange={handleFileChange}
      />
     {showConfirmation && ReactDOM.createPortal(
        <CvConfirmationModal
          data={parsedData}
          onClose={() => setShowConfirmation(true)}
          onConfirm={handleConfirmSend}
          isLoading={isLoading}
        />,
        document.body
      )}
    </div>
    
  );
};

export default AnalyticsCard;