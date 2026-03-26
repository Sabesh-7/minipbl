package com.sabes.workflow.rule_engine.domain.repository;

import com.sabes.workflow.rule_engine.domain.entity.ExecutionLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ExecutionLogRepository extends JpaRepository<ExecutionLog, Long> {

    long countByExecutedAtAfter(LocalDateTime dateTime);

    long countBySuccess(boolean success);

    List<ExecutionLog> findTop5ByOrderByExecutedAtDesc();

    @Query(value = "SELECT * FROM execution_logs e WHERE " +
           "(:search IS NULL OR LOWER(e.rule_name) LIKE CONCAT('%', CAST(:search AS TEXT), '%')) AND " +
           "(:success IS NULL OR e.success = :success) " +
           "ORDER BY e.executed_at DESC",
           countQuery = "SELECT COUNT(*) FROM execution_logs e WHERE " +
                   "(:search IS NULL OR LOWER(e.rule_name) LIKE CONCAT('%', CAST(:search AS TEXT), '%')) AND " +
                   "(:success IS NULL OR e.success = :success)",
           nativeQuery = true)
    Page<ExecutionLog> findWithFilters(
            @Param("search") String search,
            @Param("success") Boolean success,
            Pageable pageable);
}
