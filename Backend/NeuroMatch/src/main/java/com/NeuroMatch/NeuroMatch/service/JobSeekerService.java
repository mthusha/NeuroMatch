package com.NeuroMatch.NeuroMatch.service;

import com.NeuroMatch.NeuroMatch.model.dto.InterviewResponse;
import com.NeuroMatch.NeuroMatch.model.dto.InterviewRequest;
import com.NeuroMatch.NeuroMatch.model.dto.JobSeekerDto;
import com.NeuroMatch.NeuroMatch.model.entity.LikedJobs;
import com.NeuroMatch.NeuroMatch.model.entity.Users;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;
import java.util.Map;

public interface JobSeekerService {
    void updateCv(Map<String, Object> requestData) throws JsonProcessingException;
    JobSeekerDto getJobSeekerDetailsByUser(Users user);
    List<JobSeekerDto> getJobSeekersRecommendedForJobSeekers(Long jobPostId);
    InterviewRequest getInterviewQuestionsForJobSeeker(String email);
    InterviewResponse answerInterviewQuestion(String sessionId, String answer);
    String followCompany(String email, Long companyId);
    LikedJobs likePost(String email, Long postId);
    String getCVByJobSeeker(String email);
}
