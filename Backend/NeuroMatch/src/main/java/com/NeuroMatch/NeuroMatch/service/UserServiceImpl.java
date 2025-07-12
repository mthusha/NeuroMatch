package com.NeuroMatch.NeuroMatch.service;

import com.NeuroMatch.NeuroMatch.model.dto.CompanyDto;
import com.NeuroMatch.NeuroMatch.model.dto.JobSeekerDto;
import com.NeuroMatch.NeuroMatch.model.entity.Users;
import com.NeuroMatch.NeuroMatch.repository.UsersRepository;
import com.NeuroMatch.NeuroMatch.util.ValidationMessages;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

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

    public Map<String, List<String>> extractSkillsFromCV(String email) {
        return usersRepository.findByEmail(email).map(user -> {
            try {
                ObjectMapper mapper = new ObjectMapper();
                JsonNode root = mapper.readTree(user.getJobSeekerDetails().getCvJson());

                Set<String> skillSet = new LinkedHashSet<>();

                JsonNode skillsNode = root.path("skills");
                if (!skillsNode.isMissingNode()) {
                    skillsNode.path("frameworks").forEach(f -> skillSet.add(f.asText().toLowerCase()));
                    skillsNode.path("languages").forEach(l -> skillSet.add(l.asText().toLowerCase()));
                    skillsNode.path("technologies").forEach(t -> skillSet.add(t.asText().toLowerCase()));
                }
                List<String> skillList = new ArrayList<>(skillSet);
                Map<String, List<String>> result = new HashMap<>();
                result.put(ValidationMessages.USER_SKILLS, skillList);
                return result;

            } catch (Exception e) {
                System.out.println(e.getMessage());
                Map<String, List<String>> errorResult = new HashMap<>();
                errorResult.put(ValidationMessages.USER_SKILLS, new ArrayList<>());
                return errorResult;
            }
        }).orElseGet(() -> {
            Map<String, List<String>> emptyResult = new HashMap<>();
            emptyResult.put(ValidationMessages.USER_SKILLS, new ArrayList<>());
            return emptyResult;
        });
    }





}
