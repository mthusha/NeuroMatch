package com.NeuroMatch.NeuroMatch.service.voice;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.List;

@Service
public class ElevenLabsServiceImpl implements ElevenLabsService {

    @Value("${azure.tts.key}")
    private String azureKey;

    @Value("${azure.tts.region}")
    private String azureRegion;

    @Value("${elevenlabs.tts.key}")
    private String elevenLabsKey;

    @Value("${elevenlabs.voice.id}")
    private String voiceId;

    @Value("${elevenlabs.api.url}")
    private String baseApiUrl;

    private final RestTemplate restTemplate = new RestTemplate();
    public String synthesizeToBase64(String text) {
        try {
            String requestBody = """
            {
              "text": "%s",
              "model_id": "eleven_monolingual_v1",
              "voice_settings": {
                "stability": 0.75,
                "similarity_boost": 0.75
              }
            }
        """.formatted(text.replace("\"", "\\\""));

            HttpHeaders headers = new HttpHeaders();
            headers.set("xi-api-key", elevenLabsKey);
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setAccept(List.of(MediaType.APPLICATION_OCTET_STREAM));

            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);
            String fullUrl = baseApiUrl + "/" + voiceId;
            ResponseEntity<byte[]> response = restTemplate.exchange(
                    fullUrl,
                    HttpMethod.POST,
                    entity,
                    byte[].class
            );

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                return Base64.getEncoder().encodeToString(response.getBody());
            } else {
                throw new RuntimeException("TTS failed: " + response.getStatusCode());
            }

        } catch (Exception e) {
            throw new RuntimeException("Error during ElevenLabs TTS", e);
        }
    }

}
