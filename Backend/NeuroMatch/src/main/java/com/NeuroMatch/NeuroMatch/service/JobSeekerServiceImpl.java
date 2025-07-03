package com.NeuroMatch.NeuroMatch.service;
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

@Service
public class JobSeekerServiceImpl implements JobSeekerService {
    @Autowired
    private UsersRepository usersRepository;

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
}
