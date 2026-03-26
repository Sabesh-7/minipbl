package com.sabes.workflow.rule_engine.api.dto;

import java.time.LocalDateTime;

public class ExecuteRuleResponseDTO {

    private Long logId;
    private Long ruleId;
    private String ruleName;
    private boolean conditionMet;
    private String action;
    private boolean success;
    private String errorMessage;
    private LocalDateTime executedAt;

    public ExecuteRuleResponseDTO() {}

    public ExecuteRuleResponseDTO(Long logId, Long ruleId, String ruleName,
                                   boolean conditionMet, String action,
                                   boolean success, String errorMessage,
                                   LocalDateTime executedAt) {
        this.logId = logId;
        this.ruleId = ruleId;
        this.ruleName = ruleName;
        this.conditionMet = conditionMet;
        this.action = action;
        this.success = success;
        this.errorMessage = errorMessage;
        this.executedAt = executedAt;
    }

    public Long getLogId() { return logId; }
    public Long getRuleId() { return ruleId; }
    public String getRuleName() { return ruleName; }
    public boolean isConditionMet() { return conditionMet; }
    public String getAction() { return action; }
    public boolean isSuccess() { return success; }
    public String getErrorMessage() { return errorMessage; }
    public LocalDateTime getExecutedAt() { return executedAt; }
}
