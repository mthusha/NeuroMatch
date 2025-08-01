package com.NeuroMatch.NeuroMatch.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class AppliedJobsListDot {
    private Long id;
    private String appliedJob;
    private String appliedJobDescription;
    private String location;
    private String company;
    private LocalDate appliedDate;
    private String status;
    private String posterImageBase64;
    private String CompanyProfileImageBase64;
}
