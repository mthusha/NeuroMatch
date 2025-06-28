package com.NeuroMatch.NeuroMatch.repository;

import com.NeuroMatch.NeuroMatch.model.entity.JobSeekerDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobSeekerRepository extends JpaRepository<JobSeekerDetails, Long> {
}
