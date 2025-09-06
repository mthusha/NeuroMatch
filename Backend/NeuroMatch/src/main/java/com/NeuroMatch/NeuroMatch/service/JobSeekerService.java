package com.NeuroMatch.NeuroMatch.service;

import com.NeuroMatch.NeuroMatch.model.dto.InterviewResponse;
import com.NeuroMatch.NeuroMatch.model.dto.InterviewRequest;
import com.NeuroMatch.NeuroMatch.model.dto.JobSeekerDto;
import com.NeuroMatch.NeuroMatch.model.dto.JobSeekerSummery;
import com.NeuroMatch.NeuroMatch.model.entity.JobSeekerDetails;
import com.NeuroMatch.NeuroMatch.model.entity.LikedJobs;
import com.NeuroMatch.NeuroMatch.model.entity.Users;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface JobSeekerService {
    void updateCv(Map<String, Object> requestData) throws JsonProcessingException;
    JobSeekerDto getJobSeekerDetailsByUser(Users user);
    List<JobSeekerDto> getJobSeekersRecommendedForJobSeekers(Long jobPostId);
    InterviewRequest getInterviewQuestionsForJobSeeker(String email, Long jobSeekerId);
    InterviewResponse answerInterviewQuestion(String sessionId, String answer, Long jobId);
    String followCompany(String email, Long companyId);
    LikedJobs likePost(String email, Long postId);
    String getCVByJobSeeker(String email);
    JobSeekerSummery getJobSeekerSummery(String email);
    Integer getAverageScore(JobSeekerDetails jobSeeker);
    Integer getAverageScoreAPI(Long id);
    List<Map<String, Object>> checkMultipleCVs(MultipartFile[] files, Long jobId);
}
