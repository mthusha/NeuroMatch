package com.NeuroMatch.NeuroMatch.model.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CompanyDashboardDto {
    private Integer openPosition;
    private Integer followerCount;
    private Integer avgTimeToHire;
    private Integer hiringGoal;
    private Integer shortlisted;
    private Integer shortlistedPercent;

    private Integer inReview;
    private Integer inReviewPercent;

    private Integer pending;
    private Integer pendingPercent;

    private Integer rejected;
    private Integer rejectedPercent;

    private Integer totalApplied;
    private Integer totalAppliedPercent;

}
