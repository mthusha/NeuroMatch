package com.NeuroMatch.NeuroMatch.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponse {
    private String jwt;
    private String email;
    private String name;

}
