package com.NeuroMatch.NeuroMatch.repository;

import com.NeuroMatch.NeuroMatch.model.entity.AppliedJobs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppliedJobsRepository extends JpaRepository<AppliedJobs, Long> {
    List<AppliedJobs> findByJobPost_Id(Long jobPostId);
}
