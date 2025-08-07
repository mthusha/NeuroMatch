package com.NeuroMatch.NeuroMatch.service;

import com.NeuroMatch.NeuroMatch.model.dto.InterviewResponse;
import com.NeuroMatch.NeuroMatch.model.dto.InterviewRequest;

import java.util.List;
import java.util.Map;

public interface AIClientApiService {
    boolean isRecommendationMatch(Map<String, List<String>> userSkillsMap,
                        Map<String, List<String>> jobSkillsMap);
    InterviewRequest startInterview(String cvData, String email);
    InterviewResponse sendAnswer(String sessionId, String answer);

}
