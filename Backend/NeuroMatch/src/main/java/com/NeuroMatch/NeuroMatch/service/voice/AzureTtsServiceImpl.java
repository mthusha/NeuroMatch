package com.NeuroMatch.NeuroMatch.service.voice;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;
import java.util.Base64;
import java.util.List;

@Service
public class AzureTtsServiceImpl implements AzureTtsService {

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
            String escapedText = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");

            String ssml = String.format("""
    <speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' 
           xmlns:mstts='https://www.w3.org/2001/mstts' xml:lang='en-US'>
        <voice name='en-US-AriaNeural'>
            <mstts:express-as style='friendly'>
                <prosody rate='-10%%' pitch='+3%%' volume='medium'>
                    %s
                </prosody>
                <break time='300ms'/>
            </mstts:express-as>
        </voice>
    </speak>
""", escapedText);

            HttpHeaders headers = new HttpHeaders();
            headers.set("Ocp-Apim-Subscription-Key", azureKey);
            headers.setContentType(MediaType.valueOf("application/ssml+xml"));
            headers.set("X-Microsoft-OutputFormat", "audio-24khz-48kbitrate-mono-mp3");


            HttpEntity<String> entity = new HttpEntity<>(ssml, headers);

            ResponseEntity<byte[]> response = restTemplate.exchange(
                    "https://%s.tts.speech.microsoft.com/cognitiveservices/v1".formatted(azureRegion),
                    HttpMethod.POST,
                    entity,
                    byte[].class
            );

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                return Base64.getEncoder().encodeToString(response.getBody());
            }
            throw new RuntimeException("Azure TTS failed with status: " + response.getStatusCode());

        } catch (Exception e) {
            throw new RuntimeException("Azure TTS failed: " + e.getMessage(), e);
        }
    }




}