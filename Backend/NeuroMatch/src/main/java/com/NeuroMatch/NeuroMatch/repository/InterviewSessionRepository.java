package com.NeuroMatch.NeuroMatch.repository;

import com.NeuroMatch.NeuroMatch.model.entity.AppliedJobs;
import com.NeuroMatch.NeuroMatch.model.entity.InterviewSession;
import com.NeuroMatch.NeuroMatch.model.entity.JobSeekerDetails;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InterviewSessionRepository extends JpaRepository<InterviewSession, Long>{
    Optional<InterviewSession> findFirstBySessionId(String sessionId);
    Optional<InterviewSession> findTopBySessionIdAndUserResponseIsNullOrderByIdDesc(String sessionId);
//    List<InterviewSession> findByJobSeekerOrderByCreatedAtDesc(JobSeekerDetails jobSeeker);
    List<InterviewSession> findByJobSeeker(JobSeekerDetails jobSeeker);
    List<InterviewSession> findByJobSeekerAndAppliedJobsIsNull(JobSeekerDetails jobSeeker);
    void deleteByAppliedJobs_Id(Long appliedId);
    List<InterviewSession> findByAppliedJobs(AppliedJobs appliedJobs);

}
