package com.NeuroMatch.NeuroMatch.service;

import com.NeuroMatch.NeuroMatch.model.dto.CompanyDto;
import com.NeuroMatch.NeuroMatch.model.entity.CompanyDetails;
import com.NeuroMatch.NeuroMatch.model.entity.Users;
import com.NeuroMatch.NeuroMatch.repository.CompanyRepository;
import com.NeuroMatch.NeuroMatch.repository.UsersRepository;
import com.NeuroMatch.NeuroMatch.util.ValidationMessages;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CompanyServiceImpl implements CompanyService{

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Override
    public CompanyDto getCompanyByUser(Users user) {
        CompanyDto companyDto = new CompanyDto();
        BeanUtils.copyProperties(user, companyDto);
        BeanUtils.copyProperties(user.getCompanyDetails(), companyDto);

        if (user.getCompanyDetails().getProfilePicture() != null) {
            companyDto.setProfilePictureBase64(Base64.getEncoder()
                    .encodeToString(user.getCompanyDetails().getProfilePicture()));
        }
        if (user.getCompanyDetails().getCoverPicture() != null) {
            companyDto.setCoverPictureBase64(Base64.getEncoder()
                    .encodeToString(user.getCompanyDetails().getCoverPicture()));
        }
        return companyDto;
    }

    @Override
    public List<CompanyDto> getFollowedCompaniesByJobSeeker(String email) {

        List<CompanyDetails> notFollowedCompanies = companyRepository.findFollowedCompaniesByJobSeekerEmail(email);
        return notFollowedCompanies.stream().map(company -> {
            CompanyDto dto = new CompanyDto();
            BeanUtils.copyProperties(company, dto);
            if (company.getUser() != null) {
                dto.setEmail(company.getUser().getEmail());
                dto.setPassword(company.getUser().getPassword());
                dto.setProvider(company.getUser().getProvider());
                dto.setRole(company.getUser().getRole());
            }
            if (company.getProfilePicture() != null) {
                dto.setProfilePictureBase64(Base64.getEncoder()
                        .encodeToString(company.getProfilePicture()));
            }
            if (company.getCoverPicture() != null) {
                dto.setCoverPictureBase64(Base64.getEncoder()
                        .encodeToString(company.getCoverPicture()));
            }
            return dto;
        }).collect(Collectors.toList());
    }


}
