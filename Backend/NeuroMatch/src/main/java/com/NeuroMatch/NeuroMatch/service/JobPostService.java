package com.NeuroMatch.NeuroMatch.service;


import com.NeuroMatch.NeuroMatch.model.dto.JobPostDto;
import com.NeuroMatch.NeuroMatch.model.entity.JobPost;

import java.util.List;

public interface JobPostService {
    JobPost createJobPost (JobPostDto jobPostDto, String email);
    List<JobPostDto> getAllJobPostsByCompany (String email);
    List<JobPostDto> getAllRecommendJobPostsByJoSeeker(String email);
}
