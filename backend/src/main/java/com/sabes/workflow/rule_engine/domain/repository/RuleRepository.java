package com.sabes.workflow.rule_engine.domain.repository;

import com.sabes.workflow.rule_engine.domain.entity.Rule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RuleRepository extends JpaRepository<Rule, Long> {
    long countByActive(boolean active);
}
