package com.NeuroMatch.NeuroMatch.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class JobSeekerDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String phone;
    private String address;
    private String city;
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] profilePicture;
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] coverPicture;
    private String bio;
    private String description;
    private String job;
    private String jobRole;
    private String location;
    private String NeuroScore;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String cvJson;
    private String name;

    @OneToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<UserFlows> userFlows = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "jobSeeker")
    private List<LikedJobs> likedJobs = new ArrayList<>();
}
