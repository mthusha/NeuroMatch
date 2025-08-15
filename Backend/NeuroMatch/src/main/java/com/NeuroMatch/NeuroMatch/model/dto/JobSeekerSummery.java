package com.NeuroMatch.NeuroMatch.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class JobSeekerSummery {
//    private Long jobPostId;
    private Long jobSeekerId;
    private String fullName;
    private String email;

    private Map<String, Integer> sessionScores;
    private double averageScore;
    private int highestScore;
    private int lowestScore;
    private Long totalSessions;

    private Map<String, Long> interviewFrequency;
    private double averageExpectedTimeSeconds;
    private double averageActualTimeSeconds;

    private String lastInterviewDate;
    private Integer lastInterviewScore;

    private int sessionsAboveThreshold;
    private double successRatePercentage;
}
