package com.NeuroMatch.NeuroMatch.controller;

import com.NeuroMatch.NeuroMatch.model.enums.RestApiResponseStatusCodes;
import com.NeuroMatch.NeuroMatch.service.NoRegisteredInterviewService;
import com.NeuroMatch.NeuroMatch.util.EndpointBundle;
import com.NeuroMatch.NeuroMatch.util.ResponseWrapper;
import com.NeuroMatch.NeuroMatch.util.ValidationMessages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(EndpointBundle.NO_REGISTERED_INTERVIEW)
public class NoRegisteredInterviewController {

    @Autowired
    private NoRegisteredInterviewService noRegisteredInterviewService;

    @PostMapping(EndpointBundle.TEMP)
    public ResponseEntity<ResponseWrapper<String>> createTempInterview(
            @RequestBody Map<String, Object> payload
    ) {
        try {
            String email = (String) payload.get("email");
            String name = (String) payload.get("name");
            Long jobPostId = Long.valueOf(payload.get("jobPostId").toString());

            noRegisteredInterviewService.createTemInterview(email, name, jobPostId, payload);

            return ResponseEntity.ok(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.SUCCESS.getCode(),
                    ValidationMessages.TEMPORARY_INTERVIEW_SUCCESS + name,
                    name
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
