package com.NeuroMatch.NeuroMatch.service;

import com.NeuroMatch.NeuroMatch.model.dto.CompanyDto;
import com.NeuroMatch.NeuroMatch.model.dto.CompanyViewDto;
import com.NeuroMatch.NeuroMatch.model.entity.CompanyDetails;
import com.NeuroMatch.NeuroMatch.model.entity.Users;
import com.NeuroMatch.NeuroMatch.repository.CompanyRepository;
import com.NeuroMatch.NeuroMatch.repository.UserFlowsRepository;
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

//    @Autowired
//    private UsersRepository usersRepository;

    @Autowired
    private UserFlowsRepository userFlowsRepository;

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
    public CompanyViewDto getCompanyByCompanyId(Long companyId, String email) {
        CompanyViewDto companyView = new CompanyViewDto();
        companyRepository.findById(companyId).ifPresent(company -> {
            BeanUtils.copyProperties(company, companyView);
            if (company.getProfilePicture() != null) {
                companyView.setProfilePictureBase64(Base64.getEncoder()
                        .encodeToString(company.getProfilePicture()));
            }
            if (company.getCoverPicture() != null) {
                companyView.setCoverPictureBase64(Base64.getEncoder()
                        .encodeToString(company.getCoverPicture()));
            }
            boolean followed = userFlowsRepository.existsByCompanyIdAndUserUserEmail(companyId, email);
            companyView.setIsFollowing(followed);
        });
             return companyView;
    }

    @Override
    public List<CompanyDto> getFollowedCompaniesByJobSeeker(String email) {

        List<CompanyDetails> notFollowedCompanies = companyRepository.findFollowedCompaniesByJobSeekerEmail(email);
        return notFollowedCompanies.stream().map(company -> {
            CompanyDto dto = new CompanyDto();
            BeanUtils.copyProperties(company, dto);
//            if (company.getUser() != null) {
//                dto.setEmail(company.getUser().getEmail());
//                dto.setPassword(company.getUser().getPassword());
//                dto.setProvider(company.getUser().getProvider());
//                dto.setRole(company.getUser().getRole());
//            }
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

    @Override
    public List<CompanyDto> getSearchCompanyByJobSeeker(String name) {
        List<CompanyDetails> companies = companyRepository.searchByNameLike(name);

        return companies.stream()
                .map(company -> {
                    CompanyDto dto = new CompanyDto();
                    BeanUtils.copyProperties(company, dto);

                    if (company.getProfilePicture() != null) {
                        dto.setProfilePictureBase64(Base64.getEncoder().encodeToString(company.getProfilePicture()));
                    }
                    if (company.getCoverPicture() != null) {
                        dto.setCoverPictureBase64(Base64.getEncoder().encodeToString(company.getCoverPicture()));
                    }

                    if (company.getUser() != null) {
                        dto.setEmail(company.getUser().getEmail());
                        dto.setRole(company.getUser().getRole());
                        dto.setProvider(company.getUser().getProvider());
                    }

                    return dto;
                })
                .collect(Collectors.toList());
    }



}
