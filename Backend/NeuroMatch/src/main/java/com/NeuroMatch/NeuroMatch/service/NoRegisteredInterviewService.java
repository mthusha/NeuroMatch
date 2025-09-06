package com.NeuroMatch.NeuroMatch.service;

import java.util.Map;

public interface NoRegisteredInterviewService {
    void createTemInterview(String email, String name, Long jobPostId, Map<String, Object>payload);
}
