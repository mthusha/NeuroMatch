package com.NeuroMatch.NeuroMatch.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
public class CreateAssessmentDto {
    String type;
    int numberOfQuestions;
    LocalDate deadline;
    @JsonProperty("isCompanyCulture")
    boolean isCompanyCulture;
    @JsonProperty("isJobRequirement")
    boolean isJobRequirement;
    String customParameters;
    Long jobSeekerId;
    Long applicantId;
}
