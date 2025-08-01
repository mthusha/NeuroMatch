package com.NeuroMatch.NeuroMatch.service;
import com.NeuroMatch.NeuroMatch.model.dto.InterviewResponse;
import com.NeuroMatch.NeuroMatch.model.dto.InterviewSession;
import com.NeuroMatch.NeuroMatch.model.dto.JobSeekerDto;
import com.NeuroMatch.NeuroMatch.model.entity.*;
import com.NeuroMatch.NeuroMatch.repository.*;
import com.NeuroMatch.NeuroMatch.util.ValidationMessages;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class JobSeekerServiceImpl implements JobSeekerService {
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
    private CompanyRepository companyRepository;
    @Autowired
    private UserFlowsRepository userFlowsRepository;
    @Autowired
    private LikedJobsRepository likedJobsRepository;

    @Override
    public void updateCv(Map<String, Object> requestData) throws JsonProcessingException {
        Map<String, Object> cvData = (Map<String, Object>) requestData.get("cv_data");
        String email = requestData.get("user").toString();

        Users users = usersRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException(ValidationMessages.USER_NOT_FOUND));

        String json = new ObjectMapper().writeValueAsString(cvData);
        users.getJobSeekerDetails().setCvJson(json);
        usersRepository.save(users);
    }

    @Override
    public JobSeekerDto getJobSeekerDetailsByUser(Users user) {

        JobSeekerDto jobSeekerDto = new JobSeekerDto();
        BeanUtils.copyProperties(user, jobSeekerDto);
        BeanUtils.copyProperties(user.getJobSeekerDetails(), jobSeekerDto);

        if (user.getJobSeekerDetails().getProfilePicture() != null) {
            jobSeekerDto.setProfilePictureBase64(Base64.getEncoder()
                    .encodeToString(user.getJobSeekerDetails().getProfilePicture()));
        }
        if (user.getJobSeekerDetails().getCoverPicture() != null) {
            jobSeekerDto.setCoverPictureBase64(Base64.getEncoder()
                    .encodeToString(user.getJobSeekerDetails().getCoverPicture()));
        }
        return jobSeekerDto;
    }

    @Override
    public List<JobSeekerDto> getJobSeekersRecommendedForJobSeekers(Long jobPostId) {
        JobPost job= jobPostRepository.findById(jobPostId)
                .orElseThrow(() -> new RuntimeException(ValidationMessages.JOB_POST_NOT_FOUND));

        List<String> jobSkillsList = Arrays.stream(job.getRequirements().split(","))
                .map(s -> s.trim().toLowerCase())
                .toList();
        Map<String, List<String>> jobSkillsMap = Collections.singletonMap(ValidationMessages.JOB_SKILLS, jobSkillsList);

        List<Users> allUsers = usersRepository.findAll();
        List<JobSeekerDto> recommendedSeekers = new ArrayList<>();

        for (Users user : allUsers) {
            if (user.getJobSeekerDetails() == null || user.getJobSeekerDetails().getCvJson() == null)
                continue;

            Map<String, List<String>> userSkillsMap = userService.extractSkillsFromCV(user.getEmail());

            boolean isRecommended = AIClientApiService.isRecommendationMatch(userSkillsMap, jobSkillsMap);
            if (isRecommended) {
                JobSeekerDto dto = new JobSeekerDto();
                JobSeekerDetails jobSeeker = user.getJobSeekerDetails();
                BeanUtils.copyProperties(jobSeeker, dto);
                dto.setId(user.getId());
                dto.setEmail(user.getEmail());
                dto.setUserSkillsMap(jobSkillsMap);
//                dto.setSkills(userSkillsMap.getOrDefault("user_skills", Collections.emptyList()));
                dto.setProfilePictureBase64(user.getJobSeekerDetails().getProfilePicture() != null ?
                        Base64.getEncoder().encodeToString(user.getJobSeekerDetails().getProfilePicture()) : null);
                recommendedSeekers.add(dto);

            }
        }

        return recommendedSeekers;

    }

    @Override
    public String followCompany(String email, Long companyId) {
        Users user = usersRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException(ValidationMessages.USER_NOT_FOUND));

        CompanyDetails companyDetails = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException(ValidationMessages.USER_NOT_COMPANY));
        JobSeekerDetails jobSeeker = user.getJobSeekerDetails();
        Optional<UserFlows> existingFlow = userFlowsRepository.findByUserAndCompany(jobSeeker, companyDetails);

        if (existingFlow.isPresent()) {
            userFlowsRepository.delete(existingFlow.get());
            return ValidationMessages.UNFOLLOWED;
        } else {
            UserFlows userFlows = new UserFlows();
            userFlows.setUser(jobSeeker);
            userFlows.setCompany(companyDetails);
            userFlowsRepository.save(userFlows);
            return ValidationMessages.FOLLOWED;
        }
    }

    @Override
    public LikedJobs likePost(String email, Long postId) {
        Users user = usersRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException(ValidationMessages.USER_NOT_FOUND));
        JobSeekerDetails jobSeeker = user.getJobSeekerDetails();
        JobPost jobPost = jobPostRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException(ValidationMessages.JOB_POST_NOT_FOUND));

        Optional<LikedJobs> existingLike = likedJobsRepository.findByJobSeekerAndJobPost(jobSeeker, jobPost);

        if (existingLike.isPresent()) {
            likedJobsRepository.delete(existingLike.get());
            return null;
        }

        LikedJobs likedJobs = new LikedJobs();
        likedJobs.setJobSeeker(jobSeeker);
        likedJobs.setJobPost(jobPost);
        jobPost.setLikes(jobPost.getLikes());
        return likedJobsRepository.save(likedJobs);
    }



    @Override
    public InterviewSession getInterviewQuestionsForJobSeeker(String email) {
        Users user = usersRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException(ValidationMessages.USER_NOT_FOUND));
        String cvData = user.getJobSeekerDetails().getCvJson();
        return AIClientApiService.startInterview(cvData);
    }

    @Override
    public InterviewResponse answerInterviewQuestion(String sessionId, String answer) {
        return AIClientApiService.sendAnswer(sessionId, answer);
    }



}
