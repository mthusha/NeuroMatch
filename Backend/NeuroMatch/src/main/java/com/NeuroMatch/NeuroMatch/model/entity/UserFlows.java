package com.NeuroMatch.NeuroMatch.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class UserFlows {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "jobseeker_id")
    private JobSeekerDetails user;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private CompanyDetails company;
}
