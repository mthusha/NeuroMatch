package com.NeuroMatch.NeuroMatch.service;

import com.NeuroMatch.NeuroMatch.model.dto.CreateAssessmentDto;
import com.NeuroMatch.NeuroMatch.model.entity.ScheduledAssessment;

public interface ScheduledAssessmentService {
    ScheduledAssessment createAssessment(CreateAssessmentDto dto);
    void deleteOldAssessmentAndCount(Long appliedId);
    Integer getAssessmentCount(Long Id);
    void completeAssessment(Long id);
}
