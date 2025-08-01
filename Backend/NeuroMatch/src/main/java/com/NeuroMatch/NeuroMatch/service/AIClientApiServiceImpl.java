package com.NeuroMatch.NeuroMatch.service;

import com.NeuroMatch.NeuroMatch.model.dto.InterviewResponse;
import com.NeuroMatch.NeuroMatch.model.dto.InterviewSession;
import com.NeuroMatch.NeuroMatch.util.EndpointBundle;
import com.NeuroMatch.NeuroMatch.util.ValidationMessages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import org.springframework.http.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class AIClientApiServiceImpl implements AIClientApiService {

    private final RestTemplate restTemplate;
    private final AzureTtsService azureTtsService;

    public AIClientApiServiceImpl(RestTemplate restTemplate, AzureTtsService azureTtsService) {
        this.restTemplate = restTemplate;
        this.azureTtsService = azureTtsService;
    }

    @Override
    public boolean isRecommendationMatch(Map<String, List<String>> userSkillsMap,
                               Map<String, List<String>> jobSkillsMap) {
        try {
            Map<String, Object> payload = new HashMap<>();
            payload.putAll(userSkillsMap);
            payload.putAll(jobSkillsMap);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);

            String url = EndpointBundle.AI_CLIENT_URL_RECOMMEND;
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

            return Boolean.TRUE.equals(Objects.requireNonNull(response.getBody()).get("recommended"));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }
    @Override
    public InterviewSession startInterview(String cvData) {
        try {
            Map<String, Object> request = Map.of("cv_data", cvData);

            ResponseEntity<Map<String, String>> response = restTemplate.exchange(
                    EndpointBundle.AI_CLIENT_START_INTERVIEW,
                    HttpMethod.POST,
                    new HttpEntity<>(request),
                    new ParameterizedTypeReference<Map<String, String>>() {}
            );

            Map<String, String> body = response.getBody();

            if (body != null && body.containsKey("session_id") && body.containsKey("question")) {
                InterviewSession session = new InterviewSession();
                session.setSessionId(body.get("session_id"));
                session.setQuestion(body.get("question"));

                try {
//                    String audioBase64 = azureTtsService.synthesizeToBase64(body.get("question"));
//                    session.setAudioBase64(audioBase64);

                } catch (Exception e) {
                    System.err.println("TTS failed but continuing interview: " + e.getMessage());
                    session.setAudioBase64(null);
                }

                return session;
            }
            throw new RuntimeException(ValidationMessages.INVALID_RESPONSE_FROM_AI);

        } catch (Exception e) {
            throw new RuntimeException("Failed to start interview: " + e.getMessage(), e);
        }
    }

    @Override
    public InterviewResponse sendAnswer(String sessionId, String answer) {
        try {
            Map<String, Object> request = Map.of(
                    "session_id", sessionId,
                    "answer", answer
            );

            ResponseEntity<Map<String, String>> response = restTemplate.exchange(
                    EndpointBundle.AI_CLIENT_ANSWER,
                    HttpMethod.POST,
                    new HttpEntity<>(request),
                    new ParameterizedTypeReference<Map<String, String>>() {}
            );

            Map<String, String> body = response.getBody();
            if (body != null && body.containsKey("response")) {
                InterviewResponse interviewResponse = new InterviewResponse();
                interviewResponse.setResponse(body.get("response"));

                try {
//                    String audioBase64 = azureTtsService.synthesizeToBase64(body.get("response"));
//                    interviewResponse.setAudioBase64(audioBase64);
                } catch (Exception e) {
                    System.err.println("TTS failed but continuing interview: " + e.getMessage());
                    interviewResponse.setAudioBase64(null);
                }

                return interviewResponse;
            }
            throw new RuntimeException(ValidationMessages.INVALID_RESPONSE_FROM_AI);

        } catch (Exception e) {
            throw new RuntimeException("Failed to send answer: " + e.getMessage(), e);
        }
    }
}
