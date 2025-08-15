package com.NeuroMatch.NeuroMatch.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class AppliedJobSeekerUIViewDto {
    private List<String> profilePictureBase64;
    private Integer totalCount;
}
