package com.sabes.workflow.rule_engine.service;

import com.sabes.workflow.rule_engine.api.dto.RuleCreateRequestDTO;
import com.sabes.workflow.rule_engine.api.dto.RuleResponseDTO;
import com.sabes.workflow.rule_engine.api.dto.RuleUpdateRequestDTO;

import java.util.List;

public interface RuleService {
    List<RuleResponseDTO> getAllRules();
    RuleResponseDTO getRuleById(Long id);
    RuleResponseDTO createRule(RuleCreateRequestDTO request);
    RuleResponseDTO updateRule(Long id, RuleUpdateRequestDTO request);
    void deleteRule(Long id);
    RuleResponseDTO toggleRule(Long id);
}
