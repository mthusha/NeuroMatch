package com.NeuroMatch.NeuroMatch.repository;

import com.NeuroMatch.NeuroMatch.model.entity.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobPostRepository extends JpaRepository<JobPost, Long> {

    @Query("SELECT jp FROM JobPost jp " +
            "WHERE jp.companyDetails.id IN (" +
            "SELECT uf.company.id FROM UserFlows uf WHERE uf.user.user.email = :email)")
    List<JobPost> findRecommendedJobPostsByJobSeekerEmail(@Param("email") String email);

    @Query("SELECT jp FROM JobPost jp WHERE jp.companyDetails.id NOT IN (" +
            "SELECT uf.company.id FROM UserFlows uf WHERE uf.user.user.email = :email)")
    List<JobPost> findJobPostsByNotFollowedCompanies(@Param("email") String email);

    @Query("SELECT jp FROM JobPost jp WHERE jp.companyDetails.id = :companyId")
    List<JobPost> findByCompanyId(@Param("companyId") Long companyId);

}
