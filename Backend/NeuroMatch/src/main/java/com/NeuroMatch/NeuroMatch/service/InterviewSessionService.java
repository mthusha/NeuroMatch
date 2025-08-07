package com.NeuroMatch.NeuroMatch.service;

import com.NeuroMatch.NeuroMatch.model.dto.InterviewSessionRes;

import java.util.List;

public interface InterviewSessionService {

    List<InterviewSessionRes> getInterviewSessionByJobSeeker(String email);
}
