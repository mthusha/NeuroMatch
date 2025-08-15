package com.NeuroMatch.NeuroMatch.service;

import com.NeuroMatch.NeuroMatch.model.dto.InterviewSessionRes;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface InterviewSessionService {

    List<InterviewSessionRes> getInterviewSessionByJobSeeker(String email);
    List<InterviewSessionRes> getInterviewSessionByAppliedJobs(Long id);
    String saveInterviewVideo(MultipartFile file, String jobId) throws IOException;
    Resource getInterviewVideo(String jobId) throws IOException;
}
