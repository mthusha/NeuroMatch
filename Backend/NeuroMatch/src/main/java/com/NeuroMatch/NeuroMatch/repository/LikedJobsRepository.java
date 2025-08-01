package com.NeuroMatch.NeuroMatch.repository;

import com.NeuroMatch.NeuroMatch.model.entity.JobPost;
import com.NeuroMatch.NeuroMatch.model.entity.JobSeekerDetails;
import com.NeuroMatch.NeuroMatch.model.entity.LikedJobs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikedJobsRepository extends JpaRepository<LikedJobs, Long> {
    boolean existsByJobSeekerAndJobPost(JobSeekerDetails jobSeeker, JobPost jobPost);
    Optional<LikedJobs> findByJobSeekerAndJobPost(JobSeekerDetails jobSeeker, JobPost jobPost);

}
