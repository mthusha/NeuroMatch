package com.NeuroMatch.NeuroMatch.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class ScheduledAssessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;
    private int numberOfQuestions;
    private LocalDate deadline;

    private boolean isCompanyCulture;
    private boolean isJobRequirement;
    private String customParameters;

    @ManyToOne
    @JoinColumn(name = "jobSeeker_id")
    private JobSeekerDetails jobSeeker;

    @ManyToOne
    @JoinColumn(name = "jobPost_id")
    private JobPost jobPost;

    @OneToOne(mappedBy = "scheduledAssessment")
    private AssessmentCount assessmentCount;


}
