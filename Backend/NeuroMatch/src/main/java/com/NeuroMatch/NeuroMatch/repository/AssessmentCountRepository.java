package com.NeuroMatch.NeuroMatch.repository;

import com.NeuroMatch.NeuroMatch.model.entity.AssessmentCount;
import com.NeuroMatch.NeuroMatch.model.entity.ScheduledAssessment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AssessmentCountRepository extends JpaRepository<AssessmentCount, Long> {
    Optional<AssessmentCount> findByScheduledAssessment(ScheduledAssessment scheduledAssessment);
}
