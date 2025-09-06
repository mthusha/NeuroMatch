package com.NeuroMatch.NeuroMatch.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class SendInterviewEmail {

    @Autowired
    private JavaMailSender mailSender;

    @Async
    public void sendInterviewEmail(String toEmail, String jobPostName, Long appliedJobId) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Interview Request for " + jobPostName);

            String frontendLink = "http://localhost:3000/seeker-interview/"+ appliedJobId+"?email="
                    + URLEncoder.encode(toEmail, StandardCharsets.UTF_8);

            message.setText("You are contacted for an interview on job post " + jobPostName
                    + " by company " + jobPostName + ".\n"
                    + "Please follow the link to start: "
                    + frontendLink);
//                    + toEmail + "?jobId=" + appliedJobId);
            mailSender.send(message);

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
