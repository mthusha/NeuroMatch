package com.NeuroMatch.NeuroMatch.model.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class JobSeekerDto {
    private Long id;
    private String email;
    private String password;
    private String name;
    private String provider;
    private String role;
    private String phone;
    private String address;
    private String city;
    private String profilePictureBase64;
    private String coverPictureBase64;
    private String bio;
    private String description;
    private String job;
    private String jobRole;
    private String location;
    private String NeuroScore;
}
