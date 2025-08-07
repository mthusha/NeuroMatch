package com.NeuroMatch.NeuroMatch.service;

import com.NeuroMatch.NeuroMatch.model.dto.InterviewResponse;
import com.NeuroMatch.NeuroMatch.model.dto.InterviewRequest;
import com.NeuroMatch.NeuroMatch.model.entity.InterviewSession;
import com.NeuroMatch.NeuroMatch.model.entity.JobSeekerDetails;
import com.NeuroMatch.NeuroMatch.repository.InterviewSessionRepository;
import com.NeuroMatch.NeuroMatch.repository.UsersRepository;
import com.NeuroMatch.NeuroMatch.service.voice.AzureTtsService;
import com.NeuroMatch.NeuroMatch.service.voice.ElevenLabsService;
import com.NeuroMatch.NeuroMatch.util.EndpointBundle;
import com.NeuroMatch.NeuroMatch.util.HelperMethods;
import com.NeuroMatch.NeuroMatch.util.ValidationMessages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class AIClientApiServiceImpl implements AIClientApiService {

    private final RestTemplate restTemplate;
    @Autowired
    private AzureTtsService azureTtsService;
    @Autowired
    private InterviewSessionRepository interviewSessionRepository;
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private ElevenLabsService elevenLabsService;

    public AIClientApiServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
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
    public InterviewRequest startInterview(String cvData, String email) {
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
                JobSeekerDetails currentJobSeeker = usersRepository.findByEmail(email)
                        .orElseThrow(()-> new RuntimeException(ValidationMessages.USER_NOT_FOUND))
                        .getJobSeekerDetails();
                InterviewRequest session = new InterviewRequest();
                session.setSessionId(body.get("session_id"));
                session.setQuestion(HelperMethods.stripScoreSection(body.get("question")));

                InterviewSession sessionEntity = new InterviewSession();
                sessionEntity.setSessionId(body.get("session_id"));
                sessionEntity.setAIResponse(HelperMethods.stripScoreSection(body.get("question")));
                sessionEntity.setJobSeeker(currentJobSeeker);
                interviewSessionRepository.save(sessionEntity);

                try {
//                    String audioBase64 = azureTtsService.synthesizeToBase64(HelperMethods.stripScoreSection(body.get("question")));
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
                String aiResponse = HelperMethods.stripScoreSection(body.get("response"));
                updatePreviousQuestionWithAnswer(sessionId, answer);
                saveNewAIQuestion(sessionId, body.get("response"));
                InterviewResponse interviewResponse = new InterviewResponse();
                interviewResponse.setResponse(aiResponse);

                try {
//                    String audioBase64 = azureTtsService.synthesizeToBase64(aiResponse);
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




    // helper for save interview session
    private void updatePreviousQuestionWithAnswer(String sessionId, String answer) {
        interviewSessionRepository
                .findTopBySessionIdAndUserResponseIsNullOrderByIdDesc(sessionId)
                .ifPresent(lastUnanswered -> {
                    lastUnanswered.setUserResponse(answer);
                    long seconds = Duration.between(lastUnanswered.getCreatedAt(), LocalDateTime.now()).toSeconds();
                    lastUnanswered.setActualTimeSeconds((int) seconds);

                    interviewSessionRepository.save(lastUnanswered);
                });
    }


    private void saveNewAIQuestion(String sessionId, String aiResponseRaw) {
        JobSeekerDetails currentJobSeeker = interviewSessionRepository
                .findFirstBySessionId(sessionId)
                .map(InterviewSession::getJobSeeker)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        Map<String, Integer> parsed = HelperMethods.extractScoreAndTime(aiResponseRaw);

        InterviewSession newSessionEntity = new InterviewSession();
        newSessionEntity.setSessionId(sessionId);
        newSessionEntity.setAIResponse(HelperMethods.stripScoreSection(aiResponseRaw));
        newSessionEntity.setScore(parsed.get("score"));
        newSessionEntity.setExpectTimeSeconds(parsed.get("expected_time"));
        newSessionEntity.setJobSeeker(currentJobSeeker);
        interviewSessionRepository.save(newSessionEntity);
    }


}
