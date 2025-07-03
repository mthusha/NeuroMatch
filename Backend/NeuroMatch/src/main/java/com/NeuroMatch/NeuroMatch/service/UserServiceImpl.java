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

   @Autowired
   JobSeekerService jobSeekerService;

   @Autowired
   CompanyService companyService;

   @Override
    public Object getUserByEmail(String email) {
        Users user = usersRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException(ValidationMessages.USER_NOT_FOUND));
        if (Objects.equals(user.getRole(), "user")) {
            return jobSeekerService.getJobSeekerDetailsByUser(user);
        }
        if (Objects.equals(user.getRole(), "employer")) {
            return companyService.getCompanyByUser(user);
        }
        throw new RuntimeException(ValidationMessages.USER_DOSE_NOT_ASSOCIATED);
    }


    @Override
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



}
