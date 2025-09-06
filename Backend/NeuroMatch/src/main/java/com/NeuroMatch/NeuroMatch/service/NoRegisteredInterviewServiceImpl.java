package com.NeuroMatch.NeuroMatch.service;

import com.NeuroMatch.NeuroMatch.config.SendInterviewEmail;
import com.NeuroMatch.NeuroMatch.model.entity.*;
import com.NeuroMatch.NeuroMatch.repository.*;
import com.NeuroMatch.NeuroMatch.util.ValidationMessages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

@Service
public class NoRegisteredInterviewServiceImpl implements NoRegisteredInterviewService{

    @Autowired
    private UsersRepository usersRepository;
//    @Autowired
//    private JobSeekerRepository jobSeekerDetailsRepository;
    @Autowired
    private AppliedJobsRepository appliedJobsRepository;
    @Autowired
    private JobPostRepository jobPostRepository;
    @Autowired
    private SendInterviewEmail sendInterviewEmail;
    @Autowired
    private ScheduledAssessmentRepository assessmentRepository;
    @Autowired
    private AssessmentCountRepository assessmentCountRepository;

    @Override
    public void createTemInterview(String email, String name, Long jobPostId, Map<String, Object> payload) {
        Users user = new Users();
        user.setEmail(email);
        user.setPassword("temp");
        user.setProvider("temp");
        user.setRole("user");
        user.setTemp(true);

        JobSeekerDetails jobSeeker = new JobSeekerDetails();
        jobSeeker.setName(name);
        jobSeeker.setUser(user);
        jobSeeker.setBio("temp bio");
        jobSeeker.setDescription("temp description");
        jobSeeker.setJob("temp job");
        jobSeeker.setJobRole("temp role");
        jobSeeker.setLocation("temp");
        jobSeeker.setNeuroScore("0");
        jobSeeker.setCvJson("{}");

        user.setJobSeekerDetails(jobSeeker);
        usersRepository.save(user);

        JobPost jobPost = jobPostRepository.findById(jobPostId)
                .orElseThrow(() -> new RuntimeException(ValidationMessages.JOB_POST_NOT_FOUND + jobPostId));
//        jobPost.getCompanyDetails().getName();

        AppliedJobs appliedJob = new AppliedJobs();
        appliedJob.setAppliedDate(LocalDate.now());
        appliedJob.setDescription("from mail, not neuro user");
        appliedJob.setSubject("Interview Request");
        appliedJob.setStatus("Request Interview");
        appliedJob.setJobSeeker(jobSeeker);
        appliedJob.setJobPost(jobPost);

        ScheduledAssessment assessment = new ScheduledAssessment();
        assessment.setType((String) payload
                .getOrDefault("type", "technical"));
        assessment.setNumberOfQuestions((Integer) payload
                .getOrDefault("numberOfQuestions", 10));

        String deadlineStr = (String) payload.get("deadline");
        if (deadlineStr != null) {
            assessment.setDeadline(LocalDate.parse(deadlineStr));
        } else {
            assessment.setDeadline(LocalDate.now().plusDays(5));
        }
        assessment.setJobRequirement((Boolean) payload
                .getOrDefault("isJobRequirement", true));
        assessment.setCompanyCulture((Boolean) payload
                .getOrDefault("isCompanyCulture", true));
        assessment.setCustomParameters((String) payload
                .getOrDefault("customParameters", null));
        assessment.setJobSeeker(jobSeeker);
        assessment.setJobPost(jobPost);

        ScheduledAssessment savedAssessment = assessmentRepository.save(assessment);

        AssessmentCount assessmentCount = new AssessmentCount();
        assessmentCount.setScheduledAssessment(savedAssessment);
        assessmentCount.setCount(0);
        assessmentCountRepository.save(assessmentCount);

        appliedJobsRepository.save(appliedJob);

        // Send email
        sendInterviewEmail.sendInterviewEmail(email, jobPost.getCompanyDetails()
                .getName(), appliedJob.getId());
    }


}
