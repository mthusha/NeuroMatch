package com.NeuroMatch.NeuroMatch.service;

import com.NeuroMatch.NeuroMatch.model.dto.CompanyDto;
import com.NeuroMatch.NeuroMatch.model.dto.JobSeekerDto;
import com.NeuroMatch.NeuroMatch.model.entity.Users;
import com.NeuroMatch.NeuroMatch.repository.UsersRepository;
import com.NeuroMatch.NeuroMatch.util.ValidationMessages;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.Map;
import java.util.Objects;

@Service
public class UserServiceImpl implements UserService{
   @Autowired
   private UsersRepository usersRepository;

    public Object getUserByEmail(String email) {
        Users user = usersRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException(ValidationMessages.USER_NOT_FOUND));

        if (Objects.equals(user.getRole(), "user")) {
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

        if (Objects.equals(user.getRole(), "employer")) {
            CompanyDto companyDto = new CompanyDto();
            BeanUtils.copyProperties(user, companyDto);
            BeanUtils.copyProperties(user.getCompanyDetails(), companyDto);

            if (user.getCompanyDetails().getProfilePicture() != null) {
                companyDto.setProfilePictureBase64(Base64.getEncoder()
                        .encodeToString(user.getCompanyDetails().getProfilePicture()));
            }
            if (user.getCompanyDetails().getCoverPicture() != null) {
                companyDto.setCoverPictureBase64(Base64.getEncoder()
                        .encodeToString(user.getCompanyDetails().getCoverPicture()));
            }

            return companyDto;
        }

        throw new RuntimeException(ValidationMessages.USER_DOSE_NOT_ASSOCIATED);
    }


    public void uploadProfile (String base64Image, String email, String type) {
        Users user = usersRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException(ValidationMessages.USER_NOT_FOUND));
        try {
            byte[] imageBytes = Base64.getDecoder().decode(base64Image);

            if (Objects.equals(user.getRole(), "user")) {
                if (type.equalsIgnoreCase("profile")) {
                    user.getJobSeekerDetails().setProfilePicture(imageBytes);
                } else if (type.equalsIgnoreCase("cover")) {
                    user.getJobSeekerDetails().setCoverPicture(imageBytes);
                } else {
                    throw new IllegalArgumentException(ValidationMessages.INVALID_IMAGE + type);
                }
            }
            else if (Objects.equals(user.getRole(), "employer")) {
                if (type.equalsIgnoreCase("profile")) {
                    user.getCompanyDetails().setProfilePicture(imageBytes);
                } else if (type.equalsIgnoreCase("cover")) {
                    user.getCompanyDetails().setCoverPicture(imageBytes);
                } else {
                    throw new IllegalArgumentException(ValidationMessages.INVALID_IMAGE + type);
                }
            }
            usersRepository.save(user);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException(ValidationMessages.FAIL_IMAGE_UPLOAD + e.getMessage());
        }
    }

    public void updateCv(Map<String, Object> requestData) throws JsonProcessingException {
        Map<String, Object> cvData = (Map<String, Object>) requestData.get("cv_data");
        String email = requestData.get("user").toString();

        Users users = usersRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException(ValidationMessages.USER_NOT_FOUND));

        String json = new ObjectMapper().writeValueAsString(cvData);
        users.getJobSeekerDetails().setCvJson(json);
        usersRepository.save(users);
    }



}
