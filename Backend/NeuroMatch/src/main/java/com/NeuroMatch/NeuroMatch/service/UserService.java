package com.NeuroMatch.NeuroMatch.service;

import com.NeuroMatch.NeuroMatch.model.dto.JobSeekerDto;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.Map;

public interface UserService {
    Object getUserByEmail(String email);
    void uploadProfile (String base64Image, String email, String type);

}
