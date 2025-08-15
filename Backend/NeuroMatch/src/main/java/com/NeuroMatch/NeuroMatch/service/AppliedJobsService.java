package com.NeuroMatch.NeuroMatch.service;

import com.NeuroMatch.NeuroMatch.model.dto.*;
import com.NeuroMatch.NeuroMatch.model.entity.AppliedJobs;

import java.util.List;

public interface AppliedJobsService {
    AppliedJobs applyToJob(ApplyJobDto request);
    List<ApplicantResponseDto> getApplicantsByJobPostId(Long jobPostId);
    List<AppliedJobsListDot> getAppliedJobsListByJobSeeker(String email);
    String updateApplicantStatus(Long id, String status);
    AppliedJobSeekerUIViewDto getAppliedJobUserUI(Long jobsId);
    AppliedJobTitleDto getAppliedJobTitle(Long appliedJobId);
}
