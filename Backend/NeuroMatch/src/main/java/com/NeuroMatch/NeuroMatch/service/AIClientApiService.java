package com.NeuroMatch.NeuroMatch.service;

import com.NeuroMatch.NeuroMatch.model.dto.InterviewResponse;
import com.NeuroMatch.NeuroMatch.model.dto.InterviewRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface AIClientApiService {
    boolean isRecommendationMatch(Map<String, List<String>> userSkillsMap,
                        Map<String, List<String>> jobSkillsMap);
    InterviewRequest startInterview(Map<String, Object> request, String email, Long jobId);
    InterviewResponse sendAnswer(String sessionId, String answer, Long jobId);
    List<Map<String, Object>> checkMultipleCVs(MultipartFile[] files, Long jobId);

}
