package com.NeuroMatch.NeuroMatch.model.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class InterviewSessionRes {

    private Long id;
    private String sessionId;
    private String userResponse;
    private String AIResponse;
    private Integer score;
    private Integer expectTimeSeconds;
    private Integer actualTimeSeconds;
}
