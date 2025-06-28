package com.NeuroMatch.NeuroMatch.controller;

import com.NeuroMatch.NeuroMatch.service.AuthService;
import com.NeuroMatch.NeuroMatch.util.EndpointBundle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping(EndpointBundle.AUTH)
public class AuthController {

    @Autowired
    private AuthService authService;


    @PostMapping(EndpointBundle.GOOGLE)
    public ResponseEntity<?> googleLogin (@RequestBody Map<String, String> body) {
        return ResponseEntity.ok
                (authService.googleLogin(body.get("idToken")));
    }
}
