package com.NeuroMatch.NeuroMatch.controller;

import com.NeuroMatch.NeuroMatch.model.dto.CreateAssessmentDto;
import com.NeuroMatch.NeuroMatch.model.entity.ScheduledAssessment;
import com.NeuroMatch.NeuroMatch.model.enums.RestApiResponseStatusCodes;
import com.NeuroMatch.NeuroMatch.service.ScheduledAssessmentService;
import com.NeuroMatch.NeuroMatch.util.EndpointBundle;
import com.NeuroMatch.NeuroMatch.util.ResponseWrapper;
import com.NeuroMatch.NeuroMatch.util.ValidationMessages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(EndpointBundle.SCHEDULE_ASSESSMENT)
public class ScheduledAssessmentController {

    @Autowired
    private ScheduledAssessmentService scheduledAssessmentService;

    @PostMapping
    public ResponseEntity<ResponseWrapper<ScheduledAssessment>> createAssessment(
            @RequestBody CreateAssessmentDto createAssessmentDto) {
        try {
            ScheduledAssessment createdAssessment =  scheduledAssessmentService.createAssessment(createAssessmentDto);
            return ResponseEntity.ok(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.SUCCESS.getCode(),
                    ValidationMessages.ASSESSMENT_CREATED,
                    createdAssessment
            ));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.INTERNAL_SERVER_ERROR.getCode(),
                    e.getMessage(),
                    null
            ));
        }
    }

    @DeleteMapping(EndpointBundle.DELETE + EndpointBundle.ID)
    public ResponseEntity<ResponseWrapper<Void>> deleteAssessmentByAppliedId(@PathVariable Long id){
        try {
            scheduledAssessmentService.deleteOldAssessmentAndCount(id);
            return ResponseEntity.ok(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.SUCCESS.getCode(),
                    ValidationMessages.DELETE_OLD_COUNTED,
                    null
            ));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.INTERNAL_SERVER_ERROR.getCode(),
                    e.getMessage(),
                    null
            ));
        }
    }
    @GetMapping(EndpointBundle.GET_SCHEDULE_COUNT + EndpointBundle.ID)
    public ResponseEntity<ResponseWrapper<Integer>> getScheduleCount(@PathVariable Long id){
        try {
            Integer count = scheduledAssessmentService.getAssessmentCount(id);
            return ResponseEntity.ok(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.SUCCESS.getCode(),
                    ValidationMessages.COUNT_FETCHED,
                    count
            ));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.INTERNAL_SERVER_ERROR.getCode(),
                    e.getMessage(),
                    null
            ));
        }
    }

    @PostMapping(EndpointBundle.COMPLETE_ASSESSMENT + EndpointBundle.ID)
    public ResponseEntity<ResponseWrapper<Void>> completeAssessment(@PathVariable Long id){
        try {
            scheduledAssessmentService.completeAssessment(id);
            return ResponseEntity.ok(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.SUCCESS.getCode(),
                    ValidationMessages.COMPLETED_ASSESSMENT,
                    null
            ));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.INTERNAL_SERVER_ERROR.getCode(),
                    e.getMessage(),
                    null
            ));
        }
    }
}
