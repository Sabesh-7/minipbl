package com.sabes.workflow.rule_engine.service;

import com.sabes.workflow.rule_engine.api.dto.ExecuteRuleRequestDTO;
import com.sabes.workflow.rule_engine.api.dto.ExecuteRuleResponseDTO;

public interface RuleExecutionService {
    ExecuteRuleResponseDTO execute(Long ruleId, ExecuteRuleRequestDTO request);
}
