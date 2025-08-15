package com.NeuroMatch.NeuroMatch.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
public class InterviewSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sessionId;
    @Column(columnDefinition = "TEXT")
    private String userResponse;

    @Column(columnDefinition = "TEXT")
    private String AIResponse;
    private Integer score;
    private Integer expectTimeSeconds;
    private Integer actualTimeSeconds;
    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
//    private Long timestampMillis;

    @ManyToOne
    @JoinColumn(name = "jobSeeker_id")
    private JobSeekerDetails jobSeeker;

    @ManyToOne
    @JoinColumn(name = "applied_id")
    private AppliedJobs appliedJobs;
}
