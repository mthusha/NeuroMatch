package com.NeuroMatch.NeuroMatch.repository;

import com.NeuroMatch.NeuroMatch.model.entity.CompanyDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<CompanyDetails, Long> {

    @Query("SELECT c FROM CompanyDetails c WHERE c.id IN (" +
            "SELECT uf.company.id FROM UserFlows uf WHERE uf.user.user.email = :email)")
    List<CompanyDetails> findFollowedCompaniesByJobSeekerEmail(@Param("email") String email);

}
