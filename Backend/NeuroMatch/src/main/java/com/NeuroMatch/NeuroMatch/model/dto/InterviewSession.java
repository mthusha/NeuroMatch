package com.NeuroMatch.NeuroMatch.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InterviewSession {
    private String sessionId;
    private String question;
    private String audioBase64;
}
