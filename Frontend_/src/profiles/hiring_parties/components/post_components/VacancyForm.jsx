import React, { useState, useRef } from 'react';
import { postJobVacancy } from '../../../../api/Vacancy';
import { useAuth } from '../../../../context/AuthContext';
const VacancyForm = ({ onSuccess, onClose }) => {
  const { user } = useAuth();
  const userEmail = user?.email;
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    salaryRange: '',
    deadline: '',
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormData((prev) => ({ ...prev, image: file }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postJobVacancy(formData, userEmail);
      onSuccess(response.data);
    } catch (error) {
      // console.error('Failed to create vacancy:', error);
    }
  };

  const triggerFileInput = () => fileInputRef.current.click();
  const removeImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image: null }));
    fileInputRef.current.value = '';
  };


  return (
    <div className="relative bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 max-w-2xl w-full">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-t-xl"></div>
      
      <div className="mb-4">
        <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300">
          Create New Position
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">Fill in the details to post your vacancy</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-300 mb-1">Job Image</label>
          <div className="flex items-start space-x-4">
            <div className="flex flex-col items-center">
              <div 
                className="w-24 h-24 rounded-lg bg-gray-700 border-2 border-dashed border-gray-600 flex items-center justify-center overflow-hidden cursor-pointer hover:border-purple-500 transition-colors"
                onClick={triggerFileInput}
              >
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-2">
                    <svg className="w-8 h-8 text-gray-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-xs text-gray-500 mt-1">Click to upload</p>
                  </div>
                )}
              </div>
              {imagePreview && (
                <button
                  type="button"
                  className="text-xs text-red-400 hover:text-red-300 mt-1 transition"
                  onClick={removeImage}
                >
                  Remove Image
                </button>
              )}
            </div>
            <div className="flex-1">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
              <p className="text-xs text-gray-400 mb-2">Upload an image that represents this job position (JPEG, PNG)</p>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded border border-gray-600 transition"
                  onClick={triggerFileInput}
                >
                  {imagePreview ? 'Change Image' : 'Select Image'}
                </button>
                {imagePreview && (
                  <span className="text-xs text-green-400">
                    ✓ Image selected
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Job Title*</label>
            <input
              type="text"
              className="w-full p-2 text-sm border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
              placeholder="e.g. Senior Frontend Developer"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Location*</label>
            <input
              type="text"
              className="w-full p-2 text-sm border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              required
              placeholder="e.g. Remote, Worldwide"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-300 mb-1">Job Description*</label>
          <textarea
            className="w-full p-2 text-sm border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition min-h-[100px]"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
            placeholder="Describe the role and responsibilities..."
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-300 mb-1">Requirements*</label>
          <textarea
            className="w-full p-2 text-sm border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition min-h-[100px]"
            value={formData.requirements}
            onChange={(e) => setFormData({...formData, requirements: e.target.value})}
            required
            placeholder="List the required skills and qualifications..."
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Salary Range</label>
            <input
              type="text"
              className="w-full p-2 text-sm border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              value={formData.salaryRange}
              onChange={(e) => setFormData({...formData, salaryRange: e.target.value})}
              placeholder="e.g. $90k - $120k"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Application Deadline</label>
            <input
              type="date"
              className="w-full p-2 text-sm border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition [color-scheme:dark]"
              value={formData.deadline}
              onChange={(e) => setFormData({...formData, deadline: e.target.value})}
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 text-xs rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700/50 transition duration-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-xs rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 transition duration-200 shadow hover:shadow-purple-500/20 disabled:opacity-50"
            disabled={!formData.title || !formData.description || !formData.requirements || !formData.location}
          >
            Post Vacancy
          </button>
        </div>
      </form>
    </div>
  );
};

export default VacancyForm;