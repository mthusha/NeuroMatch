package com.NeuroMatch.NeuroMatch.model.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CompanyViewDto {
    private Long id;
    private String email;
    private String name;
    private String phone;
    private String address;
    private String profilePictureBase64;
    private String coverPictureBase64;
    private String description;
    private Boolean isFollowing;
}
