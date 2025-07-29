import React from 'react';

const DataSection = ({ title, children }) => (
  <div className="mb-3">
    <h4 className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-1 border-b border-gray-600 pb-1">
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
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1a1b25] rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col  border-purple-800">
        <div className="p-4 overflow-y-auto text-[11px] text-gray-300 flex-grow" style={{scrollbarWidth:"none"}}>
          <h3 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-3">
            Confirm Your CV Details
          </h3>

          <DataSection title="Personal Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {['name', 'email', 'phone', 'languages'].map((field) => (
                <div key={field}>
                  <p className="font-medium capitalize text-gray-400">{field}:</p>
                  <p>
                    {field === 'languages'
                      ? data.personal_info.languages?.join(', ')
                      : data.personal_info[field]}
                  </p>
                </div>
              ))}
            </div>
          </DataSection>

          <DataSection title="Skills">
            <div className="space-y-2">
              {Object.entries(data.skills).map(([category, items]) => (
                <div key={category}>
                  <p className="font-medium capitalize text-gray-400">{category}:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {items.map((skill, i) => (
                      <span key={i} className="bg-blue-800/30 text-blue-300 px-2 py-0.5 rounded text-[10px]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </DataSection>

          <DataSection title="Education">
            <div className="space-y-2">
              {data.education.map((edu, index) => (
                <div key={index} className="border-l-4 border-purple-600 pl-3 py-1">
                  <p className="font-semibold text-blue-300">{edu.degree}</p>
                  <p>{edu.institution}</p>
                  <p className="text-gray-500">
                    {edu.year || 'Ongoing'} {edu.awarding_body && `• ${edu.awarding_body}`}
                  </p>
                </div>
              ))}
            </div>
          </DataSection>

          <DataSection title="Experience">
            <div className="space-y-2">
              {data.experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-purple-600 pl-3 py-1">
                  <div className="flex justify-between flex-wrap">
                    <p className="font-semibold text-purple-300">{exp.position || 'Not specified'}</p>
                    <p className="text-gray-500 text-[10px]">{exp.duration}</p>
                  </div>
                  <p>{exp.company || 'Freelance'}</p>
                  {exp.responsibilities?.length > 0 && (
                    <ul className="list-disc list-inside mt-1 text-[10px] text-gray-400 space-y-0.5">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
                  )}
                  {exp.technologies_used?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {exp.technologies_used.map((tech, i) => (
                        <span key={i} className="bg-purple-700/40 text-purple-200 px-2 py-0.5 rounded text-[10px]">
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
              <div className="space-y-2">
                {data.projects.map((project, index) => (
                  <div key={index} className="bg-[#252738] p-3 rounded-lg">
                    <div className="flex justify-between items-start">
                      <p className="font-semibold text-blue-400">{project.name}</p>
                      <p className="text-gray-500 text-[10px]">{project.duration}</p>
                    </div>
                    <p className="mt-1">{project.description}</p>
                    {project.technologies?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="bg-blue-700/40 text-blue-200 px-2 py-0.5 rounded text-[10px]">
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
                        className="inline-block mt-2 text-[10px] text-purple-400 hover:underline"
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
        <div className="flex justify-end gap-2 p-3 border-t border-[#333]">
          <button
            onClick={onClose}
            className="px-3 py-1.5 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700 text-[11px]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md hover:opacity-90 text-[11px] disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Confirm and Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CvConfirmationModal;
