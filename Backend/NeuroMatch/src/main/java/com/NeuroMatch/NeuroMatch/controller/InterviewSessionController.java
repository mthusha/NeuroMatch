package com.NeuroMatch.NeuroMatch.controller;


import com.NeuroMatch.NeuroMatch.model.dto.InterviewSessionRes;
import com.NeuroMatch.NeuroMatch.model.enums.RestApiResponseStatusCodes;
import com.NeuroMatch.NeuroMatch.service.InterviewSessionService;
import com.NeuroMatch.NeuroMatch.util.EndpointBundle;
import com.NeuroMatch.NeuroMatch.util.ResponseWrapper;
import com.NeuroMatch.NeuroMatch.util.ValidationMessages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(EndpointBundle.INTERVIEW_SESSION)
public class InterviewSessionController {

    @Autowired
    private InterviewSessionService interviewSessionService;

    @GetMapping(EndpointBundle.EMAIL)
    public ResponseEntity<ResponseWrapper<List<InterviewSessionRes>>> getInterviewSessionsByJobSeeker(
            @PathVariable String email) {
        try {
            List<InterviewSessionRes> sessions = interviewSessionService.getInterviewSessionByJobSeeker(email);
            return ResponseEntity.ok(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.SUCCESS.getCode(),
                    ValidationMessages.INTERVIEW_SESSION_LIST_RETRIEVED_SUCCESSFULLY,
                    sessions
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.INTERNAL_SERVER_ERROR.getCode(),
                    e.getMessage(),
                    null
            ));
        }
    }
}
