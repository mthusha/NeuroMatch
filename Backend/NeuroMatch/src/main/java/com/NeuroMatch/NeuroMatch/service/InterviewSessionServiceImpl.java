package com.NeuroMatch.NeuroMatch.service;

import com.NeuroMatch.NeuroMatch.model.dto.InterviewSessionRes;
import com.NeuroMatch.NeuroMatch.model.entity.AppliedJobs;
import com.NeuroMatch.NeuroMatch.model.entity.InterviewSession;
import com.NeuroMatch.NeuroMatch.model.entity.JobSeekerDetails;
import com.NeuroMatch.NeuroMatch.repository.AppliedJobsRepository;
import com.NeuroMatch.NeuroMatch.repository.InterviewSessionRepository;
import com.NeuroMatch.NeuroMatch.repository.UsersRepository;
import com.NeuroMatch.NeuroMatch.util.ValidationMessages;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.List;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
@Service
public class InterviewSessionServiceImpl implements InterviewSessionService {

    @Value("${interview.file.path}")
    private String folderPath;

    @Autowired
    private InterviewSessionRepository interviewSessionRepository;
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private AppliedJobsRepository appliedJobsRepository;

    @Override
    public List<InterviewSessionRes> getInterviewSessionByJobSeeker(String email) {
        JobSeekerDetails jobSeeker = usersRepository.findByEmail(email)
                .orElseThrow(()-> new RuntimeException(ValidationMessages.USER_NOT_FOUND))
                .getJobSeekerDetails();

        List<InterviewSession> sessions = interviewSessionRepository
                .findByJobSeekerAndAppliedJobsIsNull(jobSeeker);
        List<InterviewSessionRes> responseList = new ArrayList<>();
        for (InterviewSession session : sessions) {
            InterviewSessionRes res = new InterviewSessionRes();
            BeanUtils.copyProperties(session, res);
            responseList.add(res);
        }
        return responseList;

    }

    @Override
    public List<InterviewSessionRes> getInterviewSessionByAppliedJobs(Long id) {
        AppliedJobs appliedJobs = appliedJobsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(ValidationMessages.APPLIED_JOB_NOT_ID + id));

        List<InterviewSession> sessions = interviewSessionRepository.findByAppliedJobs(appliedJobs);

        List<InterviewSessionRes> responseList = new ArrayList<>();
        for (InterviewSession session : sessions) {
            InterviewSessionRes res = new InterviewSessionRes();
            BeanUtils.copyProperties(session, res);
            responseList.add(res);
        }
        return responseList;
    }

    @Override
    public String saveInterviewVideo(MultipartFile file, String jobId) throws IOException {
        Path uploadPath = Paths.get(folderPath);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        Path filePath = uploadPath.resolve(jobId + ".webm");
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return filePath.toAbsolutePath().toString();
    }

    @Override
    public Resource getInterviewVideo(String jobId) throws IOException {
        Path filePath = Paths.get(folderPath).resolve(jobId + ".webm");
        if (!Files.exists(filePath)) {
            throw new IOException(ValidationMessages.INTERVIEW_VIDEO_NOT_FOUND + jobId);
        }
        try {
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists() && resource.isReadable()) {
                return resource;
            } else {
                throw new IOException("Could not read file: " + filePath.toString());
            }
        } catch (MalformedURLException e) {
            throw new IOException("Malformed file URL: " + filePath.toString(), e);
        }
    }

}
