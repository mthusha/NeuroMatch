package com.NeuroMatch.NeuroMatch.repository;

import com.NeuroMatch.NeuroMatch.model.entity.AppliedJobs;
import com.NeuroMatch.NeuroMatch.model.entity.JobPost;
import com.NeuroMatch.NeuroMatch.model.entity.JobSeekerDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppliedJobsRepository extends JpaRepository<AppliedJobs, Long> {
    List<AppliedJobs> findByJobPost_Id(Long jobPostId);
    boolean existsByJobSeekerAndJobPost(JobSeekerDetails jobSeeker, JobPost jobPost);
    List<AppliedJobs> findByJobSeeker(JobSeekerDetails jobSeeker);

}
