package com.NeuroMatch.NeuroMatch.repository;

import com.NeuroMatch.NeuroMatch.model.entity.CompanyDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<CompanyDetails, Long> {

}
