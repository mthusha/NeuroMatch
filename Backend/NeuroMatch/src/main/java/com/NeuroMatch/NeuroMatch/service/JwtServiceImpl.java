package com.NeuroMatch.NeuroMatch.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtServiceImpl implements JwtService {

    private static final String SECRET_KEY = "c3VwZXJfc2VjcmV0X2tleV93aGljaF9pc19hdF9sZWFzdF8zMl9jaGFycw==";

    private static final Key key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));
//    public JwtServiceImpl(@Value("${jwt.secret}") String secret) {
//        this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
//    }
    @Override
    public String generateToken(String email) {
        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(key)
                .compact();
    }

    @Override
    public String extractEmail(String token) {
        Claims claims = Jwts
                .parser()
                .setSigningKey(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claims.getSubject();
    }
}