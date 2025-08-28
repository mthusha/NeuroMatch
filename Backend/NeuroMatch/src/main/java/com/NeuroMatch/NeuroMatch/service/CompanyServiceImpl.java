package com.NeuroMatch.NeuroMatch.service;

import com.NeuroMatch.NeuroMatch.model.dto.CompanyDashboardDto;
import com.NeuroMatch.NeuroMatch.model.dto.CompanyDto;
import com.NeuroMatch.NeuroMatch.model.dto.CompanyViewDto;
import com.NeuroMatch.NeuroMatch.model.dto.GetFollowsApplied;
import com.NeuroMatch.NeuroMatch.model.entity.AppliedJobs;
import com.NeuroMatch.NeuroMatch.model.entity.CompanyDetails;
import com.NeuroMatch.NeuroMatch.model.entity.JobPost;
import com.NeuroMatch.NeuroMatch.model.entity.Users;
import com.NeuroMatch.NeuroMatch.repository.*;
import com.NeuroMatch.NeuroMatch.util.ValidationMessages;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CompanyServiceImpl implements CompanyService{

//    @Autowired
//    private UsersRepository usersRepository;

    @Autowired
    private UserFlowsRepository userFlowsRepository;

    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private JobPostRepository jobPostRepository;
    @Autowired
    private UserFlowsRepository flowsRepository;
    @Autowired
    private AppliedJobsRepository appliedJobsRepository;

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

    public GetFollowsApplied getFollowsLikes(Long companyId) {
        Long follows = userFlowsRepository.countByCompany_Id(companyId);
        Long applied = appliedJobsRepository.countByCompanyId(companyId);

        return new GetFollowsApplied(follows, applied);
    }

    @Transactional
    public CompanyDashboardDto getCompanyDashboard(String email) {
        CompanyDetails company = usersRepository.findByEmail(email)
                .orElseThrow(()-> new RuntimeException(ValidationMessages.USER_NOT_COMPANY))
                .getCompanyDetails();
        Long companyId = company.getId();

        int openPositions = jobPostRepository.countByCompanyDetailsIdAndIsActiveTrue(companyId);
        int followerCount = flowsRepository.countByCompanyId(companyId);
        int avgTimeToHire = calculateAvgTimeToHire(companyId);
        int hiringGoal = calculateHiringGoalPercent(companyId);

        //
        int totalApplied = appliedJobsRepository.countByJobPostCompanyDetailsId(companyId);
        int shortlisted = appliedJobsRepository.countByJobPostCompanyDetailsIdAndStatus(companyId, "shortlisted");
        int inReview = appliedJobsRepository.countByJobPostCompanyDetailsIdAndStatus(companyId, "reviewed");
        int pending = appliedJobsRepository.countByJobPostCompanyDetailsIdAndStatus(companyId, "Pending");
        int rejected = appliedJobsRepository.countByJobPostCompanyDetailsIdAndStatus(companyId, "rejected");

        CompanyDashboardDto dto = new CompanyDashboardDto();
        dto.setOpenPosition(openPositions);
        dto.setFollowerCount(followerCount);
        dto.setHiringGoal(hiringGoal);
        dto.setAvgTimeToHire(avgTimeToHire);

        dto.setTotalApplied(totalApplied);
        dto.setShortlisted(shortlisted);
        dto.setInReview(inReview);
        dto.setPending(pending);
        dto.setRejected(rejected);

        if (totalApplied > 0) {
            dto.setShortlistedPercent(shortlisted * 100 / totalApplied);
            dto.setInReviewPercent(inReview * 100 / totalApplied);
            dto.setPendingPercent(pending * 100 / totalApplied);
            dto.setRejectedPercent(rejected * 100 / totalApplied);
            dto.setTotalAppliedPercent(100);
        } else {
            dto.setShortlistedPercent(0);
            dto.setInReviewPercent(0);
            dto.setPendingPercent(0);
            dto.setRejectedPercent(0);
            dto.setTotalAppliedPercent(0);
        }

        return dto;

    }

    @Override
    public String getEmailByCompanyId(Long companyId) {
        CompanyDetails companyDetails = companyRepository
                .findById(companyId).orElseThrow(()-> new RuntimeException(ValidationMessages.USER_NOT_COMPANY));

        return companyDetails
                .getUser()
                .getEmail();
    }


    // support method
    public int calculateAvgTimeToHire(Long companyId) {
        List<JobPost> jobPosts = jobPostRepository.findByCompanyDetailsId(companyId);
        List<Long> daysToFirstShortlist = new ArrayList<>();
        for (JobPost job : jobPosts) {
            LocalDate postedOn = job.getPostedOn();
            if (postedOn == null || job.getAppliedJobs().isEmpty()) continue;
            Optional<AppliedJobs> firstShortlist = job.getAppliedJobs().stream()
                    .filter(app -> "shortlisted".equalsIgnoreCase(app.getStatus()))
                    .min(Comparator.comparing(AppliedJobs::getAppliedDate));
            if (firstShortlist.isPresent()) {
                long daysBetween = ChronoUnit.DAYS.between(postedOn, firstShortlist.get().getAppliedDate());
                daysToFirstShortlist.add(daysBetween);
            }
        }
        if (daysToFirstShortlist.isEmpty()) return 0;
        long totalDays = daysToFirstShortlist.stream().mapToLong(Long::longValue).sum();
        return (int) (totalDays / daysToFirstShortlist.size());
    }

    public int calculateHiringGoalPercent(Long companyId) {
        int totalApplied = appliedJobsRepository.countByJobPostCompanyDetailsId(companyId);
        int shortlisted = appliedJobsRepository.countByJobPostCompanyDetailsIdAndStatus(companyId, "shortlisted");
        int pending = appliedJobsRepository.countByJobPostCompanyDetailsIdAndStatus(companyId, "Pending");
        int inReview = appliedJobsRepository.countByJobPostCompanyDetailsIdAndStatus(companyId, "reviewed");

        int remainingPool = totalApplied - shortlisted;
        if (remainingPool == 0) return 0;

        int goalValue = pending + inReview;
        return (goalValue * 100) / remainingPool;
    }





}
