package com.NeuroMatch.NeuroMatch.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
public class CompanyDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String address;
    private String phone;
    private String description;
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] profilePicture;
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] coverPicture;

    @OneToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @OneToMany(mappedBy = "companyDetails")
    private List<JobPost> jobPosts = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "company")
    private List<UserFlows> userFlows = new ArrayList<>();
}
