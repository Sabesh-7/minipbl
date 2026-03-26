package com.sabes.workflow.rule_engine.service.impl;

import com.sabes.workflow.rule_engine.api.dto.RuleCreateRequestDTO;
import com.sabes.workflow.rule_engine.api.dto.RuleResponseDTO;
import com.sabes.workflow.rule_engine.api.dto.RuleUpdateRequestDTO;
import com.sabes.workflow.rule_engine.domain.entity.Rule;
import com.sabes.workflow.rule_engine.domain.enums.RulePriority;
import com.sabes.workflow.rule_engine.domain.repository.RuleRepository;
import com.sabes.workflow.rule_engine.exception.ResourceNotFoundException;
import com.sabes.workflow.rule_engine.service.RuleService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RuleServiceImpl implements RuleService {

    private final RuleRepository ruleRepository;

    public RuleServiceImpl(RuleRepository ruleRepository) {
        this.ruleRepository = ruleRepository;
    }

    @Override
    public List<RuleResponseDTO> getAllRules() {
        return ruleRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public RuleResponseDTO getRuleById(Long id) {
        Rule rule = ruleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rule not found with id: " + id));
        return toDTO(rule);
    }

    @Override
    public RuleResponseDTO createRule(RuleCreateRequestDTO request) {
        Rule rule = new Rule();
        rule.setName(request.getName());
        rule.setPriority(RulePriority.valueOf(request.getPriority().toUpperCase()));
        rule.setCondition(request.getCondition());
        rule.setAction(request.getAction());
        rule.setActive(request.isActive());
        rule.setWebhookUrl(request.getWebhookUrl());
        return toDTO(ruleRepository.save(rule));
    }

    @Override
    public RuleResponseDTO updateRule(Long id, RuleUpdateRequestDTO request) {
        Rule rule = ruleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rule not found with id: " + id));
        rule.setName(request.getName());
        rule.setPriority(RulePriority.valueOf(request.getPriority().toUpperCase()));
        rule.setCondition(request.getCondition());
        rule.setAction(request.getAction());
        rule.setActive(request.isActive());
        rule.setWebhookUrl(request.getWebhookUrl());
        return toDTO(ruleRepository.save(rule));
    }

    @Override
    public void deleteRule(Long id) {
        if (!ruleRepository.existsById(id)) {
            throw new ResourceNotFoundException("Rule not found with id: " + id);
        }
        ruleRepository.deleteById(id);
    }

    @Override
    public RuleResponseDTO toggleRule(Long id) {
        Rule rule = ruleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rule not found with id: " + id));
        rule.setActive(!rule.isActive());
        return toDTO(ruleRepository.save(rule));
    }

    private RuleResponseDTO toDTO(Rule rule) {
        return new RuleResponseDTO(
                rule.getId(),
                rule.getName(),
                rule.getPriority().name().toLowerCase(),
                rule.getCondition(),
                rule.getAction(),
                rule.isActive(),
                rule.getCreatedAt(),
                rule.getUpdatedAt(),
                rule.getWebhookUrl()
        );
    }
}
