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

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
public class JobPostServiceImpl implements JobPostService {

    @Autowired
    private JobPostRepository jobPostRepository;
    @Autowired
    private UsersRepository usersRepository;

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



}
