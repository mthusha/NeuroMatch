package com.NeuroMatch.NeuroMatch.controller;

import com.NeuroMatch.NeuroMatch.model.enums.RestApiResponseStatusCodes;
import com.NeuroMatch.NeuroMatch.service.JobSeekerService;
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
@RequestMapping(EndpointBundle.JOB_SEEKER)
public class JobSeekerController {

    @Autowired
    private JobSeekerService jobSeekerService;

   @PostMapping(EndpointBundle.SAVE_CV)
    public ResponseEntity<ResponseWrapper<String>> updateUserCv(@RequestBody Map<String, Object> requestData) {
        try {
            jobSeekerService.updateCv(requestData);

            ResponseWrapper<String> response = new ResponseWrapper<>(
                    RestApiResponseStatusCodes.SUCCESS.getCode(),
                    ValidationMessages.CV_UPDATED,
                    null
            );
            return ResponseEntity.ok(response);

        } catch (RuntimeException ex) {
            ResponseWrapper<String> response = new ResponseWrapper<>(
                    RestApiResponseStatusCodes.BAD_REQUEST.getCode(),
                    ex.getMessage(),
                    null
            );
            return ResponseEntity.badRequest().body(response);

        } catch (Exception ex) {
            ResponseWrapper<String> response = new ResponseWrapper<>(
                    RestApiResponseStatusCodes.INTERNAL_SERVER_ERROR.getCode(),
                    ex.getMessage(),
                    null
            );
            return ResponseEntity.internalServerError().body(response);
        }
    }
}
