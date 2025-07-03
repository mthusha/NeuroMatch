package com.NeuroMatch.NeuroMatch.controller;

import com.NeuroMatch.NeuroMatch.model.dto.AuthResponse;
import com.NeuroMatch.NeuroMatch.model.dto.LoginRequest;
import com.NeuroMatch.NeuroMatch.model.enums.RestApiResponseStatusCodes;
import com.NeuroMatch.NeuroMatch.service.AuthService;
import com.NeuroMatch.NeuroMatch.util.EndpointBundle;
import com.NeuroMatch.NeuroMatch.util.ResponseWrapper;
import com.NeuroMatch.NeuroMatch.util.ValidationMessages;
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

    @PostMapping(EndpointBundle.LOGIN)
    public ResponseEntity<ResponseWrapper<AuthResponse>> login(@RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.SUCCESS.getCode(),
                    ValidationMessages.LOGIN_SUCCESS,
                    response
            ));
        } catch (Exception e) {
            return ResponseEntity.ok(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.INTERNAL_SERVER_ERROR.getCode(),
                    e.getMessage(),
                    null
            ));
        }
    }


}
