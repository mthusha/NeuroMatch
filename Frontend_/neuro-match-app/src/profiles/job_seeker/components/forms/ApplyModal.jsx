import React from 'react';
import Modal from 'react-modal';
// import { FaTimesCircle } from 'react-icons/fa';

Modal.setAppElement('#root');

function ApplyModal({ isOpen, onClose, job, formData, setFormData, onSubmit }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      className="bg-white text-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md mx-auto transition-all duration-300 relative border border-gray-200 text-sm"
    >
      {/* <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl transition"
        title="Close"
      >
        <FaTimesCircle />
      </button> */}

      <h2 className="text-xl font-bold mb-5 text-center">
        Apply for <span className="text-indigo-600">{job?.title}</span>
      </h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <input
            type="text"
            placeholder="Enter subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none placeholder-gray-400 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            placeholder="Why are you interested in this job?"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none placeholder-gray-400 text-sm"
            rows={4}
            required
          ></textarea>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition text-sm font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-sm text-sm font-medium"
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default ApplyModal;