package com.NeuroMatch.NeuroMatch.service;

import com.NeuroMatch.NeuroMatch.model.dto.InterviewSessionRes;
import com.NeuroMatch.NeuroMatch.model.entity.InterviewSession;
import com.NeuroMatch.NeuroMatch.model.entity.JobSeekerDetails;
import com.NeuroMatch.NeuroMatch.repository.InterviewSessionRepository;
import com.NeuroMatch.NeuroMatch.repository.UsersRepository;
import com.NeuroMatch.NeuroMatch.util.ValidationMessages;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InterviewSessionServiceImpl implements InterviewSessionService {

    @Autowired
    private InterviewSessionRepository interviewSessionRepository;
    @Autowired
    private UsersRepository usersRepository;

    @Override
    public List<InterviewSessionRes> getInterviewSessionByJobSeeker(String email) {
        JobSeekerDetails jobSeeker = usersRepository.findByEmail(email)
                .orElseThrow(()-> new RuntimeException(ValidationMessages.USER_NOT_FOUND))
                .getJobSeekerDetails();

        List<InterviewSession> sessions = interviewSessionRepository
                .findByJobSeekerOrderByCreatedAtDesc(jobSeeker);
        List<InterviewSessionRes> responseList = new ArrayList<>();
        for (InterviewSession session : sessions) {
            InterviewSessionRes res = new InterviewSessionRes();
            BeanUtils.copyProperties(session, res);
            responseList.add(res);
        }
        return responseList;

    }
}
