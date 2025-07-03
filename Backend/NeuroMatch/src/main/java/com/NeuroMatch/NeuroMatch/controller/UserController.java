package com.NeuroMatch.NeuroMatch.controller;


import com.NeuroMatch.NeuroMatch.model.dto.UploadImageRequest;
import com.NeuroMatch.NeuroMatch.model.dto.JobSeekerDto;
import com.NeuroMatch.NeuroMatch.model.enums.RestApiResponseStatusCodes;
import com.NeuroMatch.NeuroMatch.service.UserService;
import com.NeuroMatch.NeuroMatch.util.EndpointBundle;
import com.NeuroMatch.NeuroMatch.util.ResponseWrapper;
import com.NeuroMatch.NeuroMatch.util.ValidationMessages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(EndpointBundle.USER)
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping(EndpointBundle.EMAIL)
    public ResponseEntity<ResponseWrapper<Object>> getUserByEmail(@PathVariable String email) {
        try {
            Object user = userService.getUserByEmail(email);

            ResponseWrapper<Object> response = new ResponseWrapper<>(
                    RestApiResponseStatusCodes.SUCCESS.getCode(),
                    ValidationMessages.RETRIEVED,
                    user
            );

            return ResponseEntity.ok(response);
        } catch (RuntimeException ex) {
            ResponseWrapper<Object> errorResponse = new ResponseWrapper<>(
                    RestApiResponseStatusCodes.BAD_REQUEST.getCode(),
                    ex.getMessage(),
                    null
            );
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PostMapping(EndpointBundle.UPLOAD_IMAGE)
    public ResponseEntity<ResponseWrapper<Object>> uploadImage(
            @RequestBody UploadImageRequest req
    ) {
        try {
            userService.uploadProfile(req.getBase64Image(), req.getEmail(), req.getType());
//            Object user = userService.getUserByEmail(req.getEmail());

            ResponseWrapper<Object> resp = new ResponseWrapper<>(
                    RestApiResponseStatusCodes.SUCCESS.getCode(),
                    ValidationMessages.IMAGE_UPLOADED,
                    null
            );
            return ResponseEntity.ok(resp);
        } catch (Exception ex) {
            ResponseWrapper<Object> err = new ResponseWrapper<>(
                    RestApiResponseStatusCodes.BAD_REQUEST.getCode(),
                    ex.getMessage(),
                    null
            );
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }



}
