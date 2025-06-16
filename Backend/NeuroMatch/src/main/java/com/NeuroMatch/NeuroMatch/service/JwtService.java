package com.NeuroMatch.NeuroMatch.service;

public interface JwtService {
    String generateToken(String email);
    String extractEmail(String token);
}
