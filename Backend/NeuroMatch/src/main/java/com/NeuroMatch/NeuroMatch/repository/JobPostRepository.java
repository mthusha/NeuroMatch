package com.NeuroMatch.NeuroMatch.repository;

import com.NeuroMatch.NeuroMatch.model.entity.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobPostRepository extends JpaRepository<JobPost, Long> {
}
