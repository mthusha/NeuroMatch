package com.NeuroMatch.NeuroMatch.repository;

import com.NeuroMatch.NeuroMatch.model.entity.CompanyDetails;
import com.NeuroMatch.NeuroMatch.model.entity.JobSeekerDetails;
import com.NeuroMatch.NeuroMatch.model.entity.UserFlows;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserFlowsRepository extends JpaRepository<UserFlows, Long> {
    @Query("""
    SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END
    FROM UserFlows f
    WHERE f.company.id = :companyId AND f.user.user.email = :email
""")
    boolean existsByCompanyIdAndUserUserEmail(@Param("companyId") Long companyId, @Param("email") String email);
    Optional<UserFlows> findByUserAndCompany(JobSeekerDetails user, CompanyDetails company);

    int countByCompanyId(Long companyId);



}
