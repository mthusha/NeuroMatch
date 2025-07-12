package com.NeuroMatch.NeuroMatch.model.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Setter
@Getter
public class ApplyJobDto {
    private Long id;
    private String description;
    private LocalDate appliedDate;
    private String subject;
    private String email;
    private Long jobPostId;
}
