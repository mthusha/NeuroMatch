import React from 'react';

const DataSection = ({ title, children }) => (
  <div className="mb-4">
    <h4 className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2 border-b border-gray-200 pb-1">
      {title}
    </h4>
    {children}
  </div>
);

export const CvConfirmationModal = ({
  data,
  onClose,
  onConfirm,
  isLoading,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-gray-200">
        <div className="p-6 overflow-y-auto text-sm text-gray-700 flex-grow" style={{scrollbarWidth:"none"}}>
          <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
            Confirm Your CV Details
          </h3>

          <DataSection title="Personal Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['name', 'email', 'phone', 'languages'].map((field) => (
                <div key={field}>
                  <p className="font-medium capitalize text-gray-500">{field}:</p>
                  <p className="text-gray-800">
                    {field === 'languages'
                      ? data.personal_info.languages?.join(', ')
                      : data.personal_info[field]}
                  </p>
                </div>
              ))}
            </div>
          </DataSection>

          <DataSection title="Skills">
            <div className="space-y-3">
              {Object.entries(data.skills).map(([category, items]) => (
                <div key={category}>
                  <p className="font-medium capitalize text-gray-500">{category}:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {items.map((skill, i) => (
                      <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </DataSection>

          <DataSection title="Education">
            <div className="space-y-3">
              {data.education.map((edu, index) => (
                <div key={index} className="border-l-4 border-indigo-400 pl-4 py-2">
                  <p className="font-semibold text-blue-700">{edu.degree}</p>
                  <p className="text-gray-800">{edu.institution}</p>
                  <p className="text-gray-500 text-sm">
                    {edu.year || 'Ongoing'} {edu.awarding_body && `• ${edu.awarding_body}`}
                  </p>
                </div>
              ))}
            </div>
          </DataSection>

          <DataSection title="Experience">
            <div className="space-y-3">
              {data.experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-indigo-400 pl-4 py-2">
                  <div className="flex justify-between flex-wrap">
                    <p className="font-semibold text-indigo-700">{exp.position || 'Not specified'}</p>
                    <p className="text-gray-500 text-xs">{exp.duration}</p>
                  </div>
                  <p className="text-gray-800">{exp.company || 'Freelance'}</p>
                  {exp.responsibilities?.length > 0 && (
                    <ul className="list-disc list-inside mt-2 text-xs text-gray-600 space-y-1">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
                  )}
                  {exp.technologies_used?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {exp.technologies_used.map((tech, i) => (
                        <span key={i} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </DataSection>

          {data.projects?.length > 0 && (
            <DataSection title="Projects">
              <div className="space-y-3">
                {data.projects.map((project, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start">
                      <p className="font-semibold text-blue-700">{project.name}</p>
                      <p className="text-gray-500 text-xs">{project.duration}</p>
                    </div>
                    <p className="mt-2 text-gray-700">{project.description}</p>
                    {project.technologies?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.github_link && (
                      <a
                        href={project.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 text-xs text-indigo-600 hover:underline"
                      >
                        View on GitHub
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </DataSection>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md hover:opacity-90 text-sm font-medium transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Confirm and Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CvConfirmationModal;