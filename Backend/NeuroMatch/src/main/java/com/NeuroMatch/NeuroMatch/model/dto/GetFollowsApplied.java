package com.NeuroMatch.NeuroMatch.model.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class GetFollowsApplied {
    private Long totalFollows;
    private Long totalApplied;
}
