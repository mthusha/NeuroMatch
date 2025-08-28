package com.NeuroMatch.NeuroMatch.repository;

import com.NeuroMatch.NeuroMatch.model.entity.AppliedJobs;
import com.NeuroMatch.NeuroMatch.model.entity.JobPost;
import com.NeuroMatch.NeuroMatch.model.entity.JobSeekerDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AppliedJobsRepository extends JpaRepository<AppliedJobs, Long> {
    List<AppliedJobs> findByJobPost_Id(Long jobPostId);
    boolean existsByJobSeekerAndJobPost(JobSeekerDetails jobSeeker, JobPost jobPost);
    List<AppliedJobs> findByJobSeeker(JobSeekerDetails jobSeeker);
    int countByJobPostCompanyDetailsId(Long companyId);
    int countByJobPostCompanyDetailsIdAndStatus(Long companyId, String status);
    Optional<AppliedJobs> findByJobSeekerIdAndJobPostId(Long jobSeekerId, Long jobPostId);
    @Query("SELECT COUNT(a) FROM AppliedJobs a WHERE a.jobPost.companyDetails.id = :companyId")
    Long countByCompanyId(@Param("companyId") Long companyId);
}
