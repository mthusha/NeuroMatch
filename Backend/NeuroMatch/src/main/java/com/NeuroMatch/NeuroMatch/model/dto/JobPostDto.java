package com.NeuroMatch.NeuroMatch.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
public class JobPostDto {

    private Long id;
    private String title;
    private String description;
    private String location;
    private Long salaryFrom;
    private Long salaryTo;
    private LocalDate postedOn;
    private LocalDate createdOn;
    private String requirements;
    private String posterImageBase64;
}
