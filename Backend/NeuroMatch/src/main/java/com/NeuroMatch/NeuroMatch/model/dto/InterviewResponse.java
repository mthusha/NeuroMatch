package com.NeuroMatch.NeuroMatch.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InterviewResponse {
    private String sessionId;
    private String response;
    private String audioBase64;

    //
    private Integer score;
    private Integer expectTimeSeconds;
    private long actualTimeSeconds;
}
