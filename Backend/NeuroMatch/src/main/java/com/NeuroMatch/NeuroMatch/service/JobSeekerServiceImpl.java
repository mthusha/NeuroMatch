package com.NeuroMatch.NeuroMatch.service;
import com.NeuroMatch.NeuroMatch.model.dto.InterviewResponse;
import com.NeuroMatch.NeuroMatch.model.dto.InterviewRequest;
import com.NeuroMatch.NeuroMatch.model.dto.JobSeekerDto;
import com.NeuroMatch.NeuroMatch.model.dto.JobSeekerSummery;
import com.NeuroMatch.NeuroMatch.model.entity.*;
import com.NeuroMatch.NeuroMatch.repository.*;
import com.NeuroMatch.NeuroMatch.util.ValidationMessages;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

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
    @Autowired
    private InterviewSessionRepository interviewSessionRepository;
    @Autowired
    private ScheduledAssessmentRepository scheduledAssessmentRepository;
    @Autowired
    private AppliedJobsRepository appliedJobsRepository;
    @Autowired
    private ScheduledAssessmentService scheduledAssessmentService;
//    @Autowired
//    private JobSeekerService jobSeekerService;

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
        jobSeekerDto.setPassword("");
        jobSeekerDto.setNeuroScore(getAverageScore(user.getJobSeekerDetails()).toString());

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

    public String getCVByJobSeeker(String email) {
        JobSeekerDetails jobSeeker = usersRepository.findByEmail(email)
                .orElseThrow(()-> new RuntimeException(ValidationMessages.USER_NOT_FOUND))
                .getJobSeekerDetails();
        return jobSeeker.getCvJson();
    }


    @Override
    public JobSeekerSummery getJobSeekerSummery(String email) {
        JobSeekerDetails jobSeeker = usersRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException(ValidationMessages.USER_NOT_FOUND))
                .getJobSeekerDetails();
        List<InterviewSession> sessions = interviewSessionRepository.findByJobSeekerAndAppliedJobsIsNull(jobSeeker);
        JobSeekerSummery summary = new JobSeekerSummery();
        summary.setJobSeekerId(jobSeeker.getId());
        summary.setFullName(jobSeeker.getName());
        summary.setEmail(email);

        if (!sessions.isEmpty()) {
            Map<String, Integer> summedSessionScores = sessions.stream()
                    .collect(Collectors.groupingBy(
                            InterviewSession::getSessionId,
                            Collectors.summingInt(s -> s.getScore() != null ? s.getScore() : 0)
                    ));
            summary.setSessionScores(summedSessionScores);

            IntSummaryStatistics scoreStats = summedSessionScores.values().stream()
                    .mapToInt(Integer::intValue)
                    .summaryStatistics();

            summary.setAverageScore(scoreStats.getAverage());
            summary.setHighestScore(scoreStats.getMax());
            summary.setLowestScore(scoreStats.getMin());
            summary.setTotalSessions(scoreStats.getCount());


            summary.setInterviewFrequency(sessions.stream()
                    .collect(Collectors.groupingBy(
                            s -> s.getCreatedAt().getYear() + "-" + String.format("%02d", s.getCreatedAt().getMonthValue()),
                            Collectors.counting()
                    )));

            summary.setAverageExpectedTimeSeconds(sessions.stream()
                    .filter(s -> s.getExpectTimeSeconds() != null)
                    .mapToInt(InterviewSession::getExpectTimeSeconds)
                    .average().orElse(0));

            summary.setAverageActualTimeSeconds(sessions.stream()
                    .filter(s -> s.getActualTimeSeconds() != null)
                    .mapToInt(InterviewSession::getActualTimeSeconds)
                    .average().orElse(0));

            sessions.sort(Comparator.comparing(InterviewSession::getCreatedAt).reversed());
            InterviewSession lastSession = sessions.getFirst();
            summary.setLastInterviewDate(lastSession.getCreatedAt().format(DateTimeFormatter.ISO_LOCAL_DATE));
            summary.setLastInterviewScore(lastSession.getScore());
            int threshold = 70;
            long above = sessions.stream()
                    .filter(s -> s.getScore() != null && s.getScore() >= threshold)
                    .count();

            summary.setSessionsAboveThreshold((int) above);
            summary.setSuccessRatePercentage((above * 100.0) / sessions.size());
        }

        return summary;
    }

    @Override
    public InterviewResponse answerInterviewQuestion(String sessionId, String answer, Long jobId) {
        return AIClientApiService.sendAnswer(sessionId, answer, jobId);
    }

    @Override
    public List<Map<String, Object>> checkMultipleCVs(MultipartFile[] files, Long jobId){
        return AIClientApiService.checkMultipleCVs(files, jobId);
    }

    @Override
    public InterviewRequest getInterviewQuestionsForJobSeeker(String email, Long jobId) {
        Users user = usersRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException(ValidationMessages.USER_NOT_FOUND));
        if (jobId != null) {
            Map<String, Object> request = fetchDataForInterview(user, jobId);
            scheduledAssessmentService.deleteOldAssessmentAndCount(jobId);
            return AIClientApiService.startInterview(request, email,jobId);
        }
        else {
            String cvData = user.getJobSeekerDetails().getCvJson();
            Map<String, Object> request = Map.of("cv_data", cvData);
            return AIClientApiService.startInterview(request, email, null);
        }
    }

    @Override
    public Integer getAverageScoreAPI(Long id) {
        AppliedJobs appliedJob = appliedJobsRepository.findById(id).orElseThrow(()-> new RuntimeException(ValidationMessages.APPLIED_JOB_NOT_FOUND));
        List<InterviewSession> sessions = interviewSessionRepository.findByAppliedJobs(appliedJob);
        int totalScore = sessions.stream().mapToInt(s -> s.getScore() != null ? s.getScore() : 0).sum();
        ScheduledAssessment assessment = scheduledAssessmentRepository
                .findFirstByJobSeekerAndJobPostOrderByIdDesc(appliedJob.getJobSeeker(), appliedJob.getJobPost())
                .orElseThrow(()-> new RuntimeException(ValidationMessages.SCHEDULED_ASSESSMENT_NOT_FOUND));
        int maxScore = assessment.getNumberOfQuestions() * 10;
        if (sessions.isEmpty()) {
            return 0;
        }

        return (int) Math.round((double) totalScore / maxScore * 100);
    }

    @Override
    public Integer getAverageScore(JobSeekerDetails jobSeeker) {
        List<InterviewSession> sessions = interviewSessionRepository.findByJobSeeker(jobSeeker);

        if (sessions == null || sessions.isEmpty()) {
            return 0;
        }

        Map<String, Integer> sessionTotals = sessions.stream()
                .filter(s -> s.getAppliedJobs() == null)
                .filter(s -> s.getScore() != null)
                .collect(Collectors.groupingBy(
                        InterviewSession::getSessionId,
                        Collectors.summingInt(InterviewSession::getScore)
                ));

        if (sessionTotals.isEmpty()) {
            return 0;
        }

        int totalScore = sessionTotals.values().stream().mapToInt(Integer::intValue).sum();
        int maxScore = sessionTotals.size() * 100;

        return (int) Math.round((totalScore / (double) maxScore) * 100);
    }



    // Support methods
    private Map<String, Object> fetchDataForInterview(Users user, Long jobId) {
        JobSeekerDetails jobSeeker = user.getJobSeekerDetails();
        JobPost jobPost = appliedJobsRepository.findById(jobId)
                .orElseThrow(()-> new RuntimeException(ValidationMessages.JOB_POST_NOT_FOUND))
                .getJobPost();

        ScheduledAssessment assessment = scheduledAssessmentRepository
                .findFirstByJobSeekerAndJobPostOrderByIdDesc(jobSeeker, jobPost)
                .orElseThrow(() -> new RuntimeException(ValidationMessages.SCHEDULED_ASSESSMENT_NOT_FOUND));

        Map<String, Object> data = new HashMap<>();
        data.put("type", assessment.getType());
        data.put("numberOfQuestions", assessment.getNumberOfQuestions());
        data.put("customParameters", assessment.getCustomParameters());
        data.put("candidateName", jobSeeker.getName());
        data.put("candidateBio", jobSeeker.getBio());

        if (assessment.isCompanyCulture()){
            data.put("companyName", jobPost.getCompanyDetails().getName());
            data.put("companyDescription", jobPost.getCompanyDetails().getDescription());
        }
        if (assessment.isJobRequirement()){
            data.put("jobRequirement", jobPost.getRequirements());
            data.put("jobTitle", jobPost.getTitle());
            data.put("jobDescription", jobPost.getDescription());
        }
        return data;
    }

}
