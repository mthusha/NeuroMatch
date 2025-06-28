package com.NeuroMatch.NeuroMatch.model.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CompanyDto {
    private Long id;
    private String email;
    private String password;
    private String name;
    private String provider;
    private String role;
    private String phone;
    private String address;
    private String profilePictureBase64;
    private String coverPictureBase64;
    private String description;
}
