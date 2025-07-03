import React, { useState } from 'react';
import { FaThumbsUp, FaShareSquare } from 'react-icons/fa';


const dummyJobs = [
        {
            id: 1,
            title: "Senior AI Engineer",
            description: "Work on cutting-edge AI/ML models with TensorFlow and PyTorch. Requirements: 5+ years experience in machine learning, strong Python skills, and experience with deep learning frameworks.",
            company: "DeepMind Technologies",
            location: "San Francisco, CA",
            postedTime: "3 hours ago",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
            likes: 12,
            views: 144,
            applied: 7,
            salary: "$150,000 - $180,000"
        },
        {
            id: 2,
            title: "React Frontend Developer",
            description: "Join our frontend team to build dynamic UI experiences. Must have 3+ years of React experience, proficiency in TypeScript, and familiarity with modern frontend build pipelines.",
            company: "Meta Platforms Inc.",
            location: "Remote",
            postedTime: "1 day ago",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
            likes: 34,
            views: 210,
            applied: 19,
            salary: "$120,000 - $140,000"
        },
        {
            id: 3,
            title: "DevOps Engineer",
            description: "Implement and maintain CI/CD pipelines, cloud infrastructure, and monitoring systems. AWS/GCP experience required, Kubernetes expertise preferred.",
            company: "Amazon Web Services",
            location: "Seattle, WA",
            postedTime: "2 days ago",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
            likes: 27,
            views: 189,
            applied: 12,
            salary: "$130,000 - $160,000"
        }
    ];


function JobFeed() {
  const [jobs, setJobs] = useState(dummyJobs);
  const [userInteractions, setUserInteractions] = useState({});

  const toggleInteraction = (jobId, type) => {
    const hasInteracted = userInteractions[jobId]?.[type] || false;

    setJobs(prev =>
      prev.map(job =>
        job.id === jobId
          ? {
              ...job,
              [type]: hasInteracted ? job[type] - 1 : job[type] + 1
            }
          : job
      )
    );

    setUserInteractions(prev => ({
      ...prev,
      [jobId]: {
        ...prev[jobId],
        [type]: !hasInteracted
      }
    }));
  };

  return (
    <div className="job-feed">
      {jobs.map(job => {
        const user = userInteractions[job.id] || {};
        return (
          <div className="job-card" key={job.id}>
            <img src={job.image} alt="Job Visual" className="job-image" />
            <div className="job-details">
              <h3>{job.title}</h3>
              <p>{job.description}</p>
            <div className="job-actions">
              <button
                onClick={() => toggleInteraction(job.id, 'likes')}
                style={{ color: user.likes ? 'blue' : 'black', display: 'flex', alignItems: 'center', gap: '6px' }}
                title="Like"
              >
                <FaThumbsUp />
                <span>{job.likes}</span>
              </button>

              <button
                onClick={() => toggleInteraction(job.id, 'applied')}
                style={{ color: user.applied ? 'purple' : 'black', display: 'flex', alignItems: 'center', gap: '6px' }}
                title="Applied"
              >
                <FaShareSquare />
                <span>{job.applied}</span>
              </button>
            </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}

export default JobFeed;
