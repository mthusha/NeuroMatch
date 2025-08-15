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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
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

    @GetMapping(EndpointBundle.GET_INTERVIEW_BY_APPLICANT + EndpointBundle.ID)
    public ResponseEntity<ResponseWrapper<List<InterviewSessionRes>>> getInterviewSessionsByApplicationId(@PathVariable Long id) {
        try {
            List<InterviewSessionRes> interviewSessionResList = interviewSessionService.getInterviewSessionByAppliedJobs(id);
            return ResponseEntity.ok(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.SUCCESS.getCode(),
                    ValidationMessages.INTERVIEW_SESSION_LIST_RETRIEVED_SUCCESSFULLY,
                    interviewSessionResList
            ));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.INTERNAL_SERVER_ERROR.getCode(),
                    e.getMessage(),
                    null
            ));
        }
    }

    @PostMapping(EndpointBundle.VIDEO_UPLOAD)
    public ResponseEntity<ResponseWrapper<String>> uploadInterviewVideo(
            @RequestParam("file") MultipartFile file,
            @RequestParam("jobId") String jobId) {
        try {
            String savedPath = interviewSessionService.saveInterviewVideo(file, jobId);
            return ResponseEntity.ok(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.SUCCESS.getCode(),
                    ValidationMessages.VIDEO_SAVED,
                    savedPath
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.INTERNAL_SERVER_ERROR.getCode(),
                    e.getMessage(),
                    null
            ));
        }
    }

    @GetMapping(EndpointBundle.GET_VIDEO)
    public ResponseEntity<Resource> getVideo(@PathVariable String jobId) throws IOException {
        Resource video = interviewSessionService.getInterviewVideo(jobId);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + jobId + ".webm\"")
                .body(video);
    }


}
