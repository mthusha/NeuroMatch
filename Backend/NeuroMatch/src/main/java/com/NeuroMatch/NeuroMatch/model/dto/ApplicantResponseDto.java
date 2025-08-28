package com.NeuroMatch.NeuroMatch.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Setter
@Getter
@AllArgsConstructor
public class ApplicantResponseDto {
    private Long id;
    private String name;
    private String email;
    private Long jobSeekerId;
    private String subject;
    private String description;
    private LocalDate appliedDate;
    private boolean recommended;
    private String score;
    private Map<String, List<String>> skill = new HashMap<>();
    private String profilePictureBase64;
    private String bio;
    private String status;
}
