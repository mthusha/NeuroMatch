package com.NeuroMatch.NeuroMatch.controller;


import com.NeuroMatch.NeuroMatch.model.dto.JobPostDto;
import com.NeuroMatch.NeuroMatch.model.entity.JobPost;
import com.NeuroMatch.NeuroMatch.model.enums.RestApiResponseStatusCodes;
import com.NeuroMatch.NeuroMatch.service.JobPostService;
import com.NeuroMatch.NeuroMatch.service.UserService;
import com.NeuroMatch.NeuroMatch.util.EndpointBundle;
import com.NeuroMatch.NeuroMatch.util.ResponseWrapper;
import com.NeuroMatch.NeuroMatch.util.ValidationMessages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(EndpointBundle.JOB_POST)
public class JobPostController {

    @Autowired
    private JobPostService jobPostService;

//    @Autowired
//    private UserService userService;

    @PostMapping(EndpointBundle.EMAIL)
    public ResponseEntity<ResponseWrapper<?>> jobPostCreate(@PathVariable String email,
                                                            @RequestBody JobPostDto jobPostDto) {
        try {
           JobPost jobPost = jobPostService.createJobPost(jobPostDto, email);
            return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.CREATED.getCode(),
                    ValidationMessages.SAVED_SUCCESSFULLY,
//                    jobPost
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
    @GetMapping(EndpointBundle.EMAIL)
    public ResponseEntity<ResponseWrapper<List<JobPostDto>>> getAllByCompanyEmail(@PathVariable String email) {
        try {
            List<JobPostDto> jobPosts = jobPostService.getAllJobPostsByCompany(email);
            return ResponseEntity.ok(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.SUCCESS.getCode(),
                    ValidationMessages.JOB_POST_RETRIEVED_SUCCESSFULLY,
                    jobPosts
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.INTERNAL_SERVER_ERROR.getCode(),
                    e.getMessage(),
                    null
            ));
        }
    }

    @GetMapping(EndpointBundle.GET_JOBS_POST_BY_COMPANY)
    public ResponseEntity<ResponseWrapper<List<JobPostDto>>> getAllByCompanyIdAndEmail(
            @PathVariable Long id,
            @RequestParam String email) {
        try {
            List<JobPostDto> jobPosts = jobPostService.getAllJobPostsByCompanyId(id, email);
            return ResponseEntity.ok(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.SUCCESS.getCode(),
                    ValidationMessages.JOB_POST_RETRIEVED_SUCCESSFULLY,
                    jobPosts
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.INTERNAL_SERVER_ERROR.getCode(),
                    e.getMessage(),
                    null
            ));
        }
    }

    @GetMapping( EndpointBundle.RECOMMENDED_COMPANY_LIST +  EndpointBundle.EMAIL)
    public ResponseEntity<ResponseWrapper<List<JobPostDto>>> getRecommendJobPostsByJoSeeker(@PathVariable String email) {
        try {
            List<JobPostDto> jobPosts = jobPostService.getAllRecommendJobPostsByJoSeeker(email);
            return ResponseEntity.ok(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.SUCCESS.getCode(),
                    ValidationMessages.RECOMMENDED_RETRIEVED_SUCCESSFULLY,
                    jobPosts
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.INTERNAL_SERVER_ERROR.getCode(),
                    e.getMessage(),
                    null
            ));
        }
    }
//    public Map<String, List<String>> extractSkillsFromCV(@PathVariable String email){
//        return userService.extractSkillsFromCV(email);
//    }
}
