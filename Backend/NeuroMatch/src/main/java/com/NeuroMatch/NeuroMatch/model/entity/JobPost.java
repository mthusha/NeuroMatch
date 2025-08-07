package com.NeuroMatch.NeuroMatch.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.autoconfigure.batch.BatchProperties;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
public class JobPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String description;
    private String location;
    private Long salaryFrom;
    private Long salaryTo;
    private LocalDate postedOn;
    private LocalDate createdOn;
    private String requirements;
    @Column(columnDefinition = "LONGBLOB")
    private byte[] posterImage;
    private Long likes;
    private Long applies;
    private Boolean isActive;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private CompanyDetails companyDetails;

    @OneToMany(mappedBy = "jobPost")
    private List<AppliedJobs> appliedJobs = new ArrayList<>();

    @OneToMany(mappedBy = "jobPost")
    private List<LikedJobs> likedJobs = new ArrayList<>();


}
