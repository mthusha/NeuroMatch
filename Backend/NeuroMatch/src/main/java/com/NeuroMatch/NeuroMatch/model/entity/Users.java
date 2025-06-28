package com.NeuroMatch.NeuroMatch.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String password;
    private String provider;
    private String role;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "user")
    private JobSeekerDetails jobSeekerDetails;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "user")
    private CompanyDetails companyDetails;

}
