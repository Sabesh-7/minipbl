package com.sabes.workflow.rule_engine.api.dto;

import java.time.LocalDateTime;

public class RecentExecutionDTO {

    private String ruleName;
    private boolean success;
    private boolean conditionMet;
    private LocalDateTime executedAt;

    public RecentExecutionDTO() {}

    public RecentExecutionDTO(String ruleName, boolean success, boolean conditionMet, LocalDateTime executedAt) {
        this.ruleName = ruleName;
        this.success = success;
        this.conditionMet = conditionMet;
        this.executedAt = executedAt;
    }

    public String getRuleName() { return ruleName; }
    public boolean isSuccess() { return success; }
    public boolean isConditionMet() { return conditionMet; }
    public LocalDateTime getExecutedAt() { return executedAt; }
}
