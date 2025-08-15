package com.NeuroMatch.NeuroMatch.service;

import com.NeuroMatch.NeuroMatch.model.dto.*;
import com.NeuroMatch.NeuroMatch.model.entity.*;
import com.NeuroMatch.NeuroMatch.repository.AppliedJobsRepository;
import com.NeuroMatch.NeuroMatch.repository.JobPostRepository;
import com.NeuroMatch.NeuroMatch.repository.UsersRepository;
import com.NeuroMatch.NeuroMatch.util.ValidationMessages;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AppliedJobsServiceImpl implements AppliedJobsService {
    @Autowired
    private AppliedJobsRepository appliedJobsRepository;
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private JobPostRepository jobPostRepository;
    @Autowired
    @Lazy
    private UserService userService;
    @Autowired
    private AIClientApiService AIClientApiService;
    @Autowired
    private JobSeekerService jobSeekerService;

    public AppliedJobs applyToJob(ApplyJobDto request) {
        Users users = usersRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException(ValidationMessages.USER_NOT_FOUND));
        if (users.getJobSeekerDetails() == null) {
            throw new RuntimeException(ValidationMessages.JOB_SEEKER_NOT_FOUND);
        }
        JobSeekerDetails jobSeeker = users.getJobSeekerDetails();

        JobPost jobPost = jobPostRepository.findById(request.getJobPostId()).orElse(null);
        if (jobPost == null) {
            throw new RuntimeException(ValidationMessages.JOB_POST_NOT_FOUND);
        }

        AppliedJobs applied = new AppliedJobs();
        applied.setJobSeeker(jobSeeker);
        applied.setJobPost(jobPost);
        applied.setSubject(request.getSubject());
        applied.setDescription(request.getDescription());
        applied.setStatus("Pending");
        applied.setAppliedDate(LocalDate.now());
        appliedJobsRepository.save(applied);
        jobPost.setApplies(jobPost.getApplies() + 1);
        jobPostRepository.save(jobPost);
        return applied;
    }

    @Override
    public List<ApplicantResponseDto> getApplicantsByJobPostId(Long jobPostId) {
        String profilePictureBase64 = "";
        JobPost job = jobPostRepository.findById(jobPostId)
                .orElseThrow(() -> new RuntimeException(ValidationMessages.JOB_POST_NOT_FOUND));

        List<AppliedJobs> appliedJobsList = appliedJobsRepository.findByJobPost_Id(jobPostId);

        List<String> jobSkills = Arrays.stream(job.getRequirements().split(","))
                .map(String::trim)
                .map(String::toLowerCase)
                .toList();
        Map<String, List<String>> jobSkillsMap = Map.of(ValidationMessages.JOB_SKILLS, jobSkills);

        List<ApplicantResponseDto> result = new ArrayList<>();

        for (AppliedJobs app : appliedJobsList) {
            JobSeekerDetails seeker = app.getJobSeeker();
            Users user = seeker.getUser();

            Map<String, List<String>> userSkillsMap = userService.extractSkillsFromCV(user.getEmail());

            boolean isRecommended = AIClientApiService.isRecommendationMatch(userSkillsMap, jobSkillsMap);
            if (user.getJobSeekerDetails().getProfilePicture() != null) {
                profilePictureBase64 = (Base64.getEncoder()
                        .encodeToString(user.getJobSeekerDetails().getProfilePicture()));
            }
            String fullName = seeker.getName();
            ApplicantResponseDto dto = new ApplicantResponseDto(
                    app.getId(),
                    fullName,
                    user.getEmail(),
                    app.getSubject(),
                    app.getDescription(),
                    app.getAppliedDate(),
                    isRecommended,
//                    seeker.getNeuroScore(),
                    jobSeekerService.getAverageScore(seeker).toString(),
                    userSkillsMap,
                    profilePictureBase64,
                    seeker.getBio(),
                    app.getStatus()
            );

            result.add(dto);
        }

        return result;
    }

    @Override
    public String updateApplicantStatus(Long id, String status) {
        AppliedJobs appliedJobs = appliedJobsRepository.
                findById(id).orElseThrow(() -> new RuntimeException(ValidationMessages.APPLIED_JOB_NOT_FOUND));
        appliedJobs.setStatus(status);
        appliedJobsRepository.save(appliedJobs);
        return status;
    }

    @Override
    public List<AppliedJobsListDot> getAppliedJobsListByJobSeeker(String email) {
        Users user = usersRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException(ValidationMessages.USER_NOT_FOUND));
        JobSeekerDetails jobSeekerDetails = user.getJobSeekerDetails();

        List<AppliedJobs> appliedJobsList = appliedJobsRepository.findByJobSeeker(jobSeekerDetails);

        List<AppliedJobsListDot> result = new ArrayList<>();

        for (AppliedJobs appliedJob : appliedJobsList) {
            JobPost jobPost = appliedJob.getJobPost();
            CompanyDetails company = jobPost.getCompanyDetails();

            AppliedJobsListDot dto = new AppliedJobsListDot();
            dto.setId(appliedJob.getId());
            dto.setAppliedJob(jobPost.getTitle());
            dto.setAppliedJobDescription(jobPost.getDescription());
            dto.setLocation(company.getAddress());
            dto.setCompany(company.getName());
            dto.setAppliedDate(appliedJob.getAppliedDate());
            dto.setStatus(appliedJob.getStatus());
            dto.setSubject(appliedJob.getSubject());

            if (jobPost.getPosterImage() != null) {
                dto.setPosterImageBase64(Base64.getEncoder().encodeToString(jobPost.getPosterImage()));
            }
            if (company.getProfilePicture() != null) {
                dto.setCompanyProfileImageBase64(Base64.getEncoder().encodeToString(company.getProfilePicture()));
            }
            result.add(dto);
        }

        return result;
    }

    @Override
    @Transactional
    public AppliedJobSeekerUIViewDto getAppliedJobUserUI(Long jobsId) {
        JobPost jobPost = jobPostRepository.findById(jobsId)
                .orElseThrow(() -> new RuntimeException(ValidationMessages.JOB_POST_NOT_FOUND));

        List<JobSeekerDetails> jobSeekers = jobPost.getAppliedJobs().stream()
                .map(AppliedJobs::getJobSeeker)
                .toList();
        AppliedJobSeekerUIViewDto dto = new AppliedJobSeekerUIViewDto();

        dto.setTotalCount(jobSeekers.size());
        List<String> profilePicsBase64 = jobSeekers.stream()
                .limit(5)
                .map(js -> {
                    if (js.getProfilePicture() != null) {
                        return Base64.getEncoder().encodeToString(js.getProfilePicture());
                    } else {
                        return null;
                    }
                })
                .collect(Collectors.toList());

        dto.setProfilePictureBase64(profilePicsBase64);

        return dto;
    }

    @Override
    public AppliedJobTitleDto getAppliedJobTitle(Long appliedJobId) {
        JobPost jobPost = appliedJobsRepository.findById(appliedJobId)
                .orElseThrow(()-> new RuntimeException(ValidationMessages.JOB_POST_NOT_FOUND))
                .getJobPost();
        AppliedJobTitleDto dto = new AppliedJobTitleDto();
        dto.setJobTitle(jobPost.getTitle());
        dto.setCompanyName(jobPost.getCompanyDetails().getName());
        dto.setLocation(jobPost.getCompanyDetails().getAddress());
        return dto;
    }
}
