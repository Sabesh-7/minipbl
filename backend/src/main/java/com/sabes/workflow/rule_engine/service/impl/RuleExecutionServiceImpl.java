package com.sabes.workflow.rule_engine.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sabes.workflow.rule_engine.api.dto.ExecuteRuleRequestDTO;
import com.sabes.workflow.rule_engine.api.dto.ExecuteRuleResponseDTO;
import com.sabes.workflow.rule_engine.domain.entity.ExecutionLog;
import com.sabes.workflow.rule_engine.domain.entity.Rule;
import com.sabes.workflow.rule_engine.domain.repository.ExecutionLogRepository;
import com.sabes.workflow.rule_engine.domain.repository.RuleRepository;
import com.sabes.workflow.rule_engine.exception.ResourceNotFoundException;
import com.sabes.workflow.rule_engine.service.RuleConditionEvaluator;
import com.sabes.workflow.rule_engine.service.RuleExecutionService;
import com.sabes.workflow.rule_engine.service.WebhookDispatcher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class RuleExecutionServiceImpl implements RuleExecutionService {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    private final RuleRepository ruleRepository;
    private final ExecutionLogRepository executionLogRepository;
    private final RuleConditionEvaluator conditionEvaluator;
    private final WebhookDispatcher webhookDispatcher;

    public RuleExecutionServiceImpl(RuleRepository ruleRepository,
                                    ExecutionLogRepository executionLogRepository,
                                    RuleConditionEvaluator conditionEvaluator,
                                    WebhookDispatcher webhookDispatcher) {
        this.ruleRepository = ruleRepository;
        this.executionLogRepository = executionLogRepository;
        this.conditionEvaluator = conditionEvaluator;
        this.webhookDispatcher = webhookDispatcher;
    }

    @Override
    public ExecuteRuleResponseDTO execute(Long ruleId, ExecuteRuleRequestDTO request) {
        Rule rule = ruleRepository.findById(ruleId)
                .orElseThrow(() -> new ResourceNotFoundException("Rule not found with id: " + ruleId));

        if (!rule.isActive()) {
            throw new IllegalStateException("Rule '" + rule.getName() + "' is not active and cannot be executed");
        }

        ExecutionLog log = new ExecutionLog();
        log.setRuleId(rule.getId());
        log.setRuleName(rule.getName());

        try {
            log.setInputData(MAPPER.writeValueAsString(request.getInput()));
            boolean conditionMet = conditionEvaluator.evaluate(rule.getCondition(), request.getInput());
            log.setConditionMet(conditionMet);
            log.setAction(conditionMet ? rule.getAction() : null);
            log.setSuccess(true);
        } catch (JsonProcessingException e) {
            log.setConditionMet(false);
            log.setSuccess(false);
            log.setErrorMessage("Input serialization failed: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            log.setConditionMet(false);
            log.setSuccess(false);
            log.setErrorMessage(e.getMessage());
        }

        ExecutionLog saved = executionLogRepository.save(log);

        if (saved.isConditionMet() && rule.getWebhookUrl() != null && !rule.getWebhookUrl().isBlank()) {
            webhookDispatcher.dispatch(rule, request.getInput(), saved);
        }

        return new ExecuteRuleResponseDTO(
                saved.getId(),
                rule.getId(),
                rule.getName(),
                saved.isConditionMet(),
                saved.getAction(),
                saved.isSuccess(),
                saved.getErrorMessage(),
                saved.getExecutedAt()
        );
    }
}
