package com.NeuroMatch.NeuroMatch.service;

import com.NeuroMatch.NeuroMatch.model.dto.AuthResponse;
import com.NeuroMatch.NeuroMatch.model.dto.LoginRequest;
import com.NeuroMatch.NeuroMatch.model.dto.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest req);
    AuthResponse login(LoginRequest req);
    AuthResponse googleLogin(String idToken);
}
