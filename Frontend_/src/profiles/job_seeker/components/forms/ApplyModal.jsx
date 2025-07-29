import React from 'react';
import Modal from 'react-modal';
import { FaTimesCircle } from 'react-icons/fa';

Modal.setAppElement('#root');

function ApplyModal({ isOpen, onClose, job, formData, setFormData, onSubmit }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      className="bg-gray-900 text-gray-100 rounded-2xl shadow-2xl p-6 w-full max-w-md mx-auto transition-all duration-300 relative border border-gray-700 text-sm"
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl transition"
        title="Close"
      >
        <FaTimesCircle />
      </button>

      <h2 className="text-lg font-bold mb-4 text-center">
        Apply for <span className="text-indigo-400">{job?.title}</span>
      </h2>

      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Subject</label>
          <input
            type="text"
            placeholder="Enter subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 outline-none placeholder-gray-400 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Description</label>
          <textarea
            placeholder="Why are you interested in this job?"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 outline-none placeholder-gray-400 text-sm"
            rows={4}
            required
          ></textarea>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg border border-gray-500 text-gray-300 hover:bg-gray-700 transition text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md text-sm"
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default ApplyModal;