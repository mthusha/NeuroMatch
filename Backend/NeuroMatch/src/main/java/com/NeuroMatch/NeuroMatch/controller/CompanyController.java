package com.NeuroMatch.NeuroMatch.controller;

import com.NeuroMatch.NeuroMatch.model.dto.CompanyDashboardDto;
import com.NeuroMatch.NeuroMatch.model.dto.CompanyDto;
import com.NeuroMatch.NeuroMatch.model.dto.CompanyViewDto;
import com.NeuroMatch.NeuroMatch.model.dto.JobPostDto;
import com.NeuroMatch.NeuroMatch.model.enums.RestApiResponseStatusCodes;
import com.NeuroMatch.NeuroMatch.service.CompanyService;
import com.NeuroMatch.NeuroMatch.util.EndpointBundle;
import com.NeuroMatch.NeuroMatch.util.ResponseWrapper;
import com.NeuroMatch.NeuroMatch.util.ValidationMessages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(EndpointBundle.COMPANY)
public class CompanyController {
    @Autowired
    private CompanyService companyService;

    @GetMapping(EndpointBundle.NOT_COMPANY_LIST + EndpointBundle.EMAIL)
    public ResponseEntity<ResponseWrapper<List<CompanyDto>>> getFollowedCompanyList(@PathVariable String email) {
        try {
            List<CompanyDto> companyDtoList = companyService.getFollowedCompaniesByJobSeeker(email);
            return ResponseEntity.ok(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.SUCCESS.getCode(),
                    ValidationMessages.COMPANY_LIST_RETRIEVED_SUCCESSFULLY,
                    companyDtoList
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.INTERNAL_SERVER_ERROR.getCode(),
                    e.getMessage(),
                    null
            ));
        }

    }

    @GetMapping(EndpointBundle.ID)
    public ResponseEntity<ResponseWrapper<CompanyViewDto>> getFollowedCompanyById(
            @PathVariable Long id,
            @RequestParam String email) {

        try {
            CompanyViewDto companyView = companyService.getCompanyByCompanyId(id, email);
            return ResponseEntity.ok(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.SUCCESS.getCode(),
                    ValidationMessages.COMPANY_LIST_RETRIEVED_SUCCESSFULLY,
                    companyView
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.INTERNAL_SERVER_ERROR.getCode(),
                    e.getMessage(),
                    null
            ));
        }
    }

    @GetMapping(EndpointBundle.SEARCH_COMPANY + EndpointBundle.name)
    public ResponseEntity<ResponseWrapper<List<CompanyDto>>> getSearchCompanyList(@PathVariable String name) {
        try {
            List<CompanyDto> companyDtoList = companyService.getSearchCompanyByJobSeeker(name);
            return ResponseEntity.ok(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.SUCCESS.getCode(),
                    ValidationMessages.COMPANY_LIST_RETRIEVED_SUCCESSFULLY,
                    companyDtoList
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.INTERNAL_SERVER_ERROR.getCode(),
                    e.getMessage(),
                    null
            ));
        }
    }

    @GetMapping(EndpointBundle.COMPANY_DASH + EndpointBundle.EMAIL)
    public ResponseEntity<ResponseWrapper<CompanyDashboardDto>> getCompanyDash (@PathVariable String email) {
        try {
            CompanyDashboardDto companyDashboardDto = companyService.getCompanyDashboard(email);
            return ResponseEntity.ok(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.SUCCESS.getCode(),
                    ValidationMessages.COMPANY_DASH_RETRIEVED_SUCCESSFULLY,
                    companyDashboardDto
            ));
        }catch (Exception e) {
            return ResponseEntity.ok(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.INTERNAL_SERVER_ERROR.getCode(),
                    e.getMessage(),
                    null
            ));
        }
    }

    @GetMapping(EndpointBundle.GET_ID_BY_EMAIL + EndpointBundle.ID)
    public ResponseEntity<ResponseWrapper<String>> getCompanyEmailById (@PathVariable Long id) {
        try {
            String email = companyService.getEmailByCompanyId(id);
            return ResponseEntity.ok(new ResponseWrapper<>(
                    RestApiResponseStatusCodes.SUCCESS.getCode(),
                    ValidationMessages.RETRIEVED,
                    email
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
