package com.NeuroMatch.NeuroMatch.service;

import com.NeuroMatch.NeuroMatch.model.dto.CompanyDto;
import com.NeuroMatch.NeuroMatch.model.entity.Users;

import java.util.List;

public interface CompanyService {
    CompanyDto getCompanyByUser(Users user);
    List<CompanyDto> getFollowedCompaniesByJobSeeker(String email);
}
