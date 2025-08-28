package com.NeuroMatch.NeuroMatch.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDate;

@Entity
@Setter
@Getter
public class AppliedJobs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "LONGTEXT")
    private String description;
    private LocalDate appliedDate;
    private String subject;
    private String status;

    @ManyToOne
    @JoinColumn(name = "jobSeeker_id")
    private JobSeekerDetails jobSeeker;

    @ManyToOne
    @JoinColumn(name = "jobPost_id")
    private JobPost jobPost;
}
