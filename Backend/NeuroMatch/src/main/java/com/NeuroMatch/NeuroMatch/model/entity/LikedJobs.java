package com.NeuroMatch.NeuroMatch.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class LikedJobs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "jobSeeker_id")
    private JobSeekerDetails jobSeeker;

    @ManyToOne
    @JoinColumn(name = "jobPost_id")
    private JobPost jobPost;
}
