package com.NeuroMatch.NeuroMatch.controller;

import com.NeuroMatch.NeuroMatch.model.dto.AppliedJobsListDot;
import com.NeuroMatch.NeuroMatch.model.dto.InterviewResponse;
import com.NeuroMatch.NeuroMatch.model.dto.InterviewSession;
import com.NeuroMatch.NeuroMatch.model.dto.JobSeekerDto;
import com.NeuroMatch.NeuroMatch.model.entity.LikedJobs;
import com.NeuroMatch.NeuroMatch.model.enums.RestApiResponseStatusCodes;
import com.NeuroMatch.NeuroMatch.service.JobSeekerService;
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

    @GetMapping(EndpointBundle.RECOMMENDED_JOB_SEEKERS + EndpointBundle.ID)
    public ResponseEntity<ResponseWrapper<List<JobSeekerDto>>> getJobSeekersRecommendedForJobSeekers(@PathVariable Long id){
        try {
            List<JobSeekerDto> recommendedJobSeekers =jobSeekerService.getJobSeekersRecommendedForJobSeekers(id);

            ResponseWrapper<List<JobSeekerDto>> response = new ResponseWrapper<>(
                    RestApiResponseStatusCodes.SUCCESS.getCode(),
                    ValidationMessages.RECOMMENDED_JOB_SEEKERS,
                    recommendedJobSeekers
            );
            return ResponseEntity.ok(response);

        } catch (RuntimeException ex) {
            ResponseWrapper<List<JobSeekerDto>> response = new ResponseWrapper<>(
                    RestApiResponseStatusCodes.BAD_REQUEST.getCode(),
                    ex.getMessage(),
                    null
            );
            return ResponseEntity.badRequest().body(response);

        } catch (Exception ex) {
            ResponseWrapper<List<JobSeekerDto>> response = new ResponseWrapper<>(
                    RestApiResponseStatusCodes.INTERNAL_SERVER_ERROR.getCode(),
                    ex.getMessage(),
                    null
            );
            return ResponseEntity.internalServerError().body(response);
        }
    }
    @GetMapping(EndpointBundle.FOLLOW)
    public ResponseEntity<ResponseWrapper<String>> followOrUnfollowCompany(
            @RequestParam String email,
            @RequestParam Long companyId
    ) {
        try {
            String resultMessage = jobSeekerService.followCompany(email, companyId);
            return ResponseEntity.ok(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.SUCCESS.getCode(),
                    resultMessage,
                    resultMessage
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.INTERNAL_SERVER_ERROR.getCode(),
                    e.getMessage(),
                    null
            ));
        }
    }


    @PostMapping(EndpointBundle.LIKE)
    public ResponseEntity<ResponseWrapper<LikedJobs>> likeJobSeekers(
            @RequestParam String email,
            @RequestParam Long jobPostId
    ) {
       try{
           LikedJobs likedJobs = jobSeekerService.likePost(email, jobPostId);
           return ResponseEntity.ok(new ResponseWrapper<>(
                   RestApiResponseStatusCodes.SUCCESS.getCode(),
                   ValidationMessages.LIKED,
                   likedJobs
           ));
       }catch (Exception e) {
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseWrapper<>(
                   RestApiResponseStatusCodes.INTERNAL_SERVER_ERROR.getCode(),
                   e.getMessage(),
                   null
           ));
       }
    }

    @GetMapping(EndpointBundle.INTERVIEW_QUESTIONS + EndpointBundle.EMAIL)
    public ResponseEntity<ResponseWrapper<InterviewSession>> startInterviewByEmail(@PathVariable String email) {
        try {
            InterviewSession questions = jobSeekerService.getInterviewQuestionsForJobSeeker(email);
            ResponseWrapper<InterviewSession> response = new ResponseWrapper<>(
                    RestApiResponseStatusCodes.SUCCESS.getCode(),
                    ValidationMessages.INTERVIEW_QA_GENERATED,
                    questions
            );
            return ResponseEntity.ok(response);
        } catch (RuntimeException ex) {
            ResponseWrapper<InterviewSession> response = new ResponseWrapper<>(
                    RestApiResponseStatusCodes.BAD_REQUEST.getCode(),
                    ex.getMessage(),
                    null
            );
            return ResponseEntity.badRequest().body(response);
        } catch (Exception ex) {
            ResponseWrapper<InterviewSession> response = new ResponseWrapper<>(
                    RestApiResponseStatusCodes.INTERNAL_SERVER_ERROR.getCode(),
                    ex.getMessage(),
                    null
            );
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @PostMapping(EndpointBundle.INTERVIEW_QUESTIONS + EndpointBundle.INTERVIEW_ANSWERS)
    public ResponseEntity<ResponseWrapper<InterviewResponse>> answerInterviewQuestion(@RequestBody Map<String, String> payload) {
        try {
            String sessionId = payload.get("session_id");
            String answer = payload.get("answer");
            InterviewResponse response = jobSeekerService.answerInterviewQuestion(sessionId, answer);
            ResponseWrapper<InterviewResponse> wrapper = new ResponseWrapper<>(
                    RestApiResponseStatusCodes.SUCCESS.getCode(),
                    ValidationMessages.ANSWER_PROCESSED,
                    response
            );
            return ResponseEntity.ok(wrapper);
        } catch (RuntimeException ex) {
            ResponseWrapper<InterviewResponse> wrapper = new ResponseWrapper<>(
                    RestApiResponseStatusCodes.BAD_REQUEST.getCode(),
                    ex.getMessage(),
                    null
            );
            return ResponseEntity.badRequest().body(wrapper);
        } catch (Exception ex) {
            ResponseWrapper<InterviewResponse> wrapper = new ResponseWrapper<>(
                    RestApiResponseStatusCodes.INTERNAL_SERVER_ERROR.getCode(),
                    ex.getMessage(),
                    null
            );
            return ResponseEntity.internalServerError().body(wrapper);
        }
    }


}
