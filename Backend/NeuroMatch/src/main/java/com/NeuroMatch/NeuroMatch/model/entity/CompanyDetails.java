package com.NeuroMatch.NeuroMatch.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class CompanyDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String address;
    private String phone;
    private String description;
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] profilePicture;
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] coverPicture;

    @OneToOne
    @JoinColumn(name = "user_id")
    private Users user;

}
