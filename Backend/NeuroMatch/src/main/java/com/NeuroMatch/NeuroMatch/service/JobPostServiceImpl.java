package com.NeuroMatch.NeuroMatch.service;

import com.NeuroMatch.NeuroMatch.model.dto.JobPostDto;
import com.NeuroMatch.NeuroMatch.model.entity.CompanyDetails;
import com.NeuroMatch.NeuroMatch.model.entity.JobPost;
import com.NeuroMatch.NeuroMatch.model.entity.Users;
import com.NeuroMatch.NeuroMatch.repository.JobPostRepository;
import com.NeuroMatch.NeuroMatch.repository.UsersRepository;
import com.NeuroMatch.NeuroMatch.util.ValidationMessages;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class JobPostServiceImpl implements JobPostService {

    @Autowired
    private JobPostRepository jobPostRepository;
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private MLApiService mlApiService;

    @Override
    public JobPost createJobPost (JobPostDto jobPostDto, String email) {
        Users user = usersRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException(ValidationMessages.USER_NOT_FOUND));

        String base64Image = jobPostDto.getPosterImageBase64();
        if (base64Image.contains(",")) {
            base64Image = base64Image.split(",")[1];
        }
        byte[] imageBytes = Base64.getDecoder().decode(base64Image);

            CompanyDetails companyDetails = user.getCompanyDetails();
            JobPost jobPost = new JobPost();
            BeanUtils.copyProperties(jobPostDto, jobPost);
            jobPost.setPosterImage(imageBytes);
            jobPost.setCompanyDetails(companyDetails);
            jobPostRepository.save(jobPost);
            return jobPost;
    }

    @Override
    @Transactional
    public List<JobPostDto> getAllJobPostsByCompany(String email) {
        Users user = usersRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException(ValidationMessages.USER_NOT_FOUND));

        CompanyDetails company = user.getCompanyDetails();
        List<JobPost> jobPostList = company.getJobPosts();
        List<JobPostDto> jobPostDtoList = new ArrayList<>();

        for (JobPost jobPost : jobPostList) {
            JobPostDto dto = new JobPostDto();
            BeanUtils.copyProperties(jobPost, dto);

            if (jobPost.getPosterImage() != null) {
                String base64Image = "data:image/jpeg;base64," +
                        Base64.getEncoder().encodeToString(jobPost.getPosterImage());
                dto.setPosterImageBase64(base64Image);
            }

            jobPostDtoList.add(dto);
        }

        return jobPostDtoList;
    }

    @Override
    public List<JobPostDto> getAllRecommendJobPostsByJoSeeker(String email) {
        List<JobPost> recommendJobPosts = jobPostRepository.findRecommendedJobPostsByJobSeekerEmail(email);
        List<JobPost> allJobPosts = jobPostRepository.findJobPostsByNotFollowedCompanies(email);
        Map<String, List<String>> userSkillsMap = userService.extractSkillsFromCV(email);
//        List<String> userSkills = userSkillsMap.getOrDefault("user_skills", new ArrayList<>());

        Set<Long> existingIds = recommendJobPosts.stream()
                .map(JobPost::getId)
                .collect(Collectors.toSet());

        List<JobPostDto> finalRecommended = new ArrayList<>();
        for (JobPost job : recommendJobPosts) {
            JobPostDto dto = new JobPostDto();
            BeanUtils.copyProperties(job, dto);
            dto.setSuggestionsType("following");
            dto.setPostedBy(job.getCompanyDetails().getName());
            if (job.getPosterImage() != null) {
                dto.setPosterImageBase64(Base64.getEncoder().encodeToString(job.getPosterImage()));
            }
            if (job.getCompanyDetails().getProfilePicture() != null) {
                dto.setProfileImageBase64(Base64.getEncoder().encodeToString(job.getCompanyDetails().getProfilePicture()));
            }
            finalRecommended.add(dto);
        }
        for (JobPost job : allJobPosts) {
            if (existingIds.contains(job.getId())) continue;
            List<String> jobSkillsList = Arrays.stream(job.getRequirements().split(","))
                    .map(s -> s.trim().toLowerCase())
                    .toList();
            Map<String, List<String>> jobSkillsMap = Collections.singletonMap(ValidationMessages.JOB_SKILLS, jobSkillsList);
            boolean isRecommended = mlApiService.sendToMLApi(userSkillsMap, jobSkillsMap);

            if (isRecommended) {
                JobPostDto dto = new JobPostDto();
                BeanUtils.copyProperties(job, dto);
                dto.setSuggestionsType("recommended");
                dto.setPostedBy(job.getCompanyDetails().getName());
                if (job.getPosterImage() != null) {
                    dto.setPosterImageBase64(Base64.getEncoder().encodeToString(job.getPosterImage()));
                }
                if (job.getCompanyDetails().getProfilePicture() != null) {
                    dto.setProfileImageBase64(Base64.getEncoder().encodeToString(job.getCompanyDetails().getProfilePicture()));
                }
                finalRecommended.add(dto);
            }
        }

        return finalRecommended;
    }



}
