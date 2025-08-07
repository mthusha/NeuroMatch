package com.NeuroMatch.NeuroMatch.service;

import com.NeuroMatch.NeuroMatch.model.dto.ApplicantResponseDto;
import com.NeuroMatch.NeuroMatch.model.dto.AppliedJobsListDot;
import com.NeuroMatch.NeuroMatch.model.dto.ApplyJobDto;
import com.NeuroMatch.NeuroMatch.model.entity.AppliedJobs;

import java.util.List;

public interface AppliedJobsService {
    AppliedJobs applyToJob(ApplyJobDto request);
    List<ApplicantResponseDto> getApplicantsByJobPostId(Long jobPostId);
    List<AppliedJobsListDot> getAppliedJobsListByJobSeeker(String email);
    String updateApplicantStatus(Long id, String status);
}
