package com.NeuroMatch.NeuroMatch.service;

import com.NeuroMatch.NeuroMatch.util.EndpointBundle;
import org.springframework.stereotype.Service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class MLApiServiceImpl implements MLApiService{

    private final RestTemplate restTemplate;

    public MLApiServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public boolean sendToMLApi(Map<String, List<String>> userSkillsMap,
                               Map<String, List<String>> jobSkillsMap) {
        try {
            Map<String, Object> payload = new HashMap<>();
            payload.putAll(userSkillsMap);
            payload.putAll(jobSkillsMap);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);

            String url = EndpointBundle.MLA_URL;
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

            return Boolean.TRUE.equals(Objects.requireNonNull(response.getBody()).get("recommended"));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }
}
