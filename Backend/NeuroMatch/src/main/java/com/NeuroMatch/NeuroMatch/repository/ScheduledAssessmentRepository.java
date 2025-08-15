package com.NeuroMatch.NeuroMatch.repository;

import com.NeuroMatch.NeuroMatch.model.entity.JobPost;
import com.NeuroMatch.NeuroMatch.model.entity.JobSeekerDetails;
import com.NeuroMatch.NeuroMatch.model.entity.ScheduledAssessment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ScheduledAssessmentRepository extends JpaRepository<ScheduledAssessment, Long> {
//    Optional<ScheduledAssessment> findByJobSeekerAndJobPost(JobSeekerDetails jobSeeker, JobPost jobPost);
    Optional<ScheduledAssessment> findFirstByJobSeekerAndJobPostOrderByIdDesc(JobSeekerDetails jobSeeker, JobPost jobPost);

}
