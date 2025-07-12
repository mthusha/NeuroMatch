package com.NeuroMatch.NeuroMatch.controller;

import com.NeuroMatch.NeuroMatch.model.dto.ApplicantResponseDto;
import com.NeuroMatch.NeuroMatch.model.dto.ApplyJobDto;
import com.NeuroMatch.NeuroMatch.model.dto.JobPostDto;
import com.NeuroMatch.NeuroMatch.model.entity.AppliedJobs;
import com.NeuroMatch.NeuroMatch.model.entity.JobPost;
import com.NeuroMatch.NeuroMatch.model.enums.RestApiResponseStatusCodes;
import com.NeuroMatch.NeuroMatch.service.AppliedJobsService;
import com.NeuroMatch.NeuroMatch.util.EndpointBundle;
import com.NeuroMatch.NeuroMatch.util.ResponseWrapper;
import com.NeuroMatch.NeuroMatch.util.ValidationMessages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(EndpointBundle.APPLIED_JOBS)
public class AppliedJobsController {

    @Autowired
    private AppliedJobsService appliedJobsService;

    @PostMapping()
    public ResponseEntity<ResponseWrapper<?>> jobPostCreate(
            @RequestBody ApplyJobDto applyJobDto) {
        try {
            AppliedJobs appliedJobs = appliedJobsService.applyToJob(applyJobDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.CREATED.getCode(),
                    ValidationMessages.SAVED_SUCCESSFULLY,
//                    appliedJobs
                    null
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.BAD_REQUEST.getCode(),
                    RestApiResponseStatusCodes.INTERNAL_SERVER_ERROR.getMessage(),
                    null
            ));
        }
    }

    @GetMapping(EndpointBundle.RECOMMENDED_APPLIED_JOBS)
    public ResponseEntity<ResponseWrapper<?>> getApplicants(@PathVariable Long jobPostId) {
        try {
            List<ApplicantResponseDto> applicants = appliedJobsService.getApplicantsByJobPostId(jobPostId);
            return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.CREATED.getCode(),
                    ValidationMessages.APPLICANTS_RETRIEVED_SUCCESSFULLY,
                    applicants
  //                  null
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.BAD_REQUEST.getCode(),
//                    RestApiResponseStatusCodes.INTERNAL_SERVER_ERROR.getMessage(),
                    e.getMessage(),
                    null
            ));
        }
    }



}
