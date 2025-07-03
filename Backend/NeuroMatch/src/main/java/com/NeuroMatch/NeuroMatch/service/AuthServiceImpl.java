package com.NeuroMatch.NeuroMatch.service;

import com.NeuroMatch.NeuroMatch.config.GoogleTokenVerifier;
import com.NeuroMatch.NeuroMatch.model.dto.AuthResponse;
import com.NeuroMatch.NeuroMatch.model.dto.LoginRequest;
import com.NeuroMatch.NeuroMatch.model.dto.RegisterRequest;
import com.NeuroMatch.NeuroMatch.model.entity.JobSeekerDetails;
import com.NeuroMatch.NeuroMatch.model.entity.Users;
import com.NeuroMatch.NeuroMatch.repository.UsersRepository;
import com.NeuroMatch.NeuroMatch.util.ValidationMessages;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private UsersRepository userRepo;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private GoogleTokenVerifier googleTokenVerifier;

//    @Autowired
    public AuthResponse register(RegisterRequest req) {
        if (userRepo.existsByEmail(req.getEmail())) {
            throw new RuntimeException(ValidationMessages.DUPLICATE_EMAIL);
        }

        Users user = new Users();
        user.setEmail(req.getEmail());
        user.setPassword(encoder.encode(req.getPassword()));
        JobSeekerDetails jobSeekerDetails = new JobSeekerDetails();
        jobSeekerDetails.setName(req.getName());
        jobSeekerDetails.setUser(user);
        user.setJobSeekerDetails(jobSeekerDetails);
        user.setProvider("LOCAL");

        userRepo.save(user);
        return new AuthResponse(jwtService.generateToken(user.getEmail()), user.getEmail(), user.getJobSeekerDetails().getName(), user.getRole());
    }

    @Override
    public AuthResponse login(LoginRequest req) {
        String name = "";
        Users user = userRepo.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException(ValidationMessages.USER_NOT_FOUND));

        if (!encoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException(ValidationMessages.INVALID_PASSWORD);
        }
        if (user.getRole().equals("user")) {
            name = user.getJobSeekerDetails().getName();
        }
        else if (user.getRole().equals("employer")) {
            name = user.getCompanyDetails().getName();
        }
        return new AuthResponse(jwtService.generateToken(user.getEmail()), user.getEmail(), name, user.getRole());
    }

    @Override
    public AuthResponse googleLogin (String idToken) {
        GoogleIdToken.Payload payload = googleTokenVerifier.verify(idToken);
        String email = payload.getEmail();
        String name = (String) payload.get("name");

        Users user = userRepo.findByEmail(email).orElse(null);
        if (user == null) {
            user = new Users();
            user.setEmail(email);
            JobSeekerDetails jobSeekerDetails = new JobSeekerDetails();
            jobSeekerDetails.setName(name);
            jobSeekerDetails.setUser(user);
            user.setJobSeekerDetails(jobSeekerDetails);
            user.setProvider("GOOGLE");
            userRepo.save(user);
        }

        return new AuthResponse(jwtService.generateToken(user.getEmail()), user.getEmail(), user.getJobSeekerDetails().getName(), user.getRole());
    }
}
