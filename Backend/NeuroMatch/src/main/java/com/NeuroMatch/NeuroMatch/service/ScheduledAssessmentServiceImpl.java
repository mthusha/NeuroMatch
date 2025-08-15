package com.NeuroMatch.NeuroMatch.service;

import com.NeuroMatch.NeuroMatch.model.dto.CreateAssessmentDto;
import com.NeuroMatch.NeuroMatch.model.entity.*;
import com.NeuroMatch.NeuroMatch.repository.*;
import com.NeuroMatch.NeuroMatch.util.ValidationMessages;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScheduledAssessmentServiceImpl implements ScheduledAssessmentService {

    @Autowired
    private ScheduledAssessmentRepository assessmentRepository;
    @Autowired
    private JobSeekerRepository jobSeekerRepository;
//    @Autowired
//    private JobPostRepository jobPostRepository;
    @Autowired
    private AppliedJobsRepository appliedJobRepository;
    @Autowired
    private InterviewSessionRepository interviewSessionRepository;
    @Autowired
    private ScheduledAssessmentRepository scheduledAssessmentRepository;
    @Autowired
    private AssessmentCountRepository assessmentCountRepository;


    @Override
    public ScheduledAssessment createAssessment(CreateAssessmentDto dto) {
        JobSeekerDetails jobSeeker = jobSeekerRepository.findById(dto.getJobSeekerId())
                .orElseThrow(() -> new IllegalArgumentException(ValidationMessages.JOB_SEEKER_NOT_FOUND));

        JobPost jobPost = appliedJobRepository.findById(dto.getApplicantId())
                .orElseThrow(()-> new RuntimeException(ValidationMessages.JOB_POST_NOT_FOUND))
                .getJobPost();

//        JobPost jobPost = jobPostRepository.findById(dto.getJobPostId())
//                .orElseThrow(() -> new IllegalArgumentException(ValidationMessages.JOB_POST_NOT_FOUND));

//        appliedJobRepository.findByJobSeekerIdAndJobPostId(dto.getJobSeekerId(), jobPost.getId())
//                .ifPresent(appliedJob -> {
//                    appliedJob.setStatus("Request Interview");
//                    appliedJobRepository.save(appliedJob);
//                });
        appliedJobRepository.findById(dto.getApplicantId()).ifPresent(appliedJob -> {
                    appliedJob.setStatus("Request Interview");
                    appliedJobRepository.save(appliedJob);
                });

        ScheduledAssessment assessment = new ScheduledAssessment();
        assessment.setType(dto.getType());
        assessment.setNumberOfQuestions(dto.getNumberOfQuestions());
        assessment.setDeadline(dto.getDeadline());
        assessment.setCompanyCulture(dto.isCompanyCulture());
        assessment.setJobRequirement(dto.isJobRequirement());
        assessment.setCustomParameters(dto.getCustomParameters());
        assessment.setJobSeeker(jobSeeker);
        assessment.setJobPost(jobPost);

        //
        ScheduledAssessment savedAssessment = assessmentRepository.save(assessment);
        AssessmentCount assessmentCount = new AssessmentCount();
//        assessmentCount.setId(savedAssessment.getId());
        assessmentCount.setScheduledAssessment(savedAssessment);
        assessmentCount.setCount(0);
        assessmentCountRepository.save(assessmentCount);
        return savedAssessment;
    }

    @Override
    @Transactional
    public void deleteOldAssessmentAndCount(Long appliedId) {
        interviewSessionRepository.deleteByAppliedJobs_Id(appliedId);
        AppliedJobs appliedJob = appliedJobRepository.findById(appliedId)
                .orElseThrow(() -> new RuntimeException(ValidationMessages.APPLIED_JOB_NOT_ID + appliedId));

        JobSeekerDetails jobSeeker = appliedJob.getJobSeeker();
        JobPost jobPost = appliedJob.getJobPost();
        ScheduledAssessment scheduledAssessment = scheduledAssessmentRepository
                .findFirstByJobSeekerAndJobPostOrderByIdDesc(jobSeeker, jobPost)
                .orElseThrow(() -> new RuntimeException(ValidationMessages.SCHEDULED_ASSESSMENT_NOT_FOUND_FOR_JOB_SEEKER));
        AssessmentCount assessmentCount = assessmentCountRepository
                .findByScheduledAssessment(scheduledAssessment)
                .orElseThrow(() -> new RuntimeException(ValidationMessages.ASSESSMENT_COUNT_NOT_FOUND_FOR_JOB_SEEKER));
        int newCount = assessmentCount.getCount() + 1;
        assessmentCount.setCount(newCount);
        assessmentCountRepository.save(assessmentCount);
    }

    @Override
    public Integer getAssessmentCount(Long Id) {
        JobSeekerDetails jobSeeker = appliedJobRepository.findById(Id)
                .orElseThrow(()-> new RuntimeException(ValidationMessages.APPLIED_JOB_NOT_ID))
                .getJobSeeker();

        JobPost jobPost = appliedJobRepository.findById(Id)
                .orElseThrow(()-> new RuntimeException(ValidationMessages.JOB_POST_NOT_FOUND))
                .getJobPost();

        ScheduledAssessment assessment = scheduledAssessmentRepository.findFirstByJobSeekerAndJobPostOrderByIdDesc(jobSeeker, jobPost)
                .orElseThrow(()-> new RuntimeException(ValidationMessages.ASSESSMENT_COUNT_NOT_FOUND_FOR_JOB_SEEKER));

        return assessment.getAssessmentCount().getCount();
    }

    @Override
    public void completeAssessment(Long id) {
        appliedJobRepository.findById(id).ifPresent(appliedJob -> {
            appliedJob.setStatus("Waiting");
            appliedJobRepository.save(appliedJob);
        });
    }


}
