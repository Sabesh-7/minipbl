package com.sabes.workflow.rule_engine.api.dto;

import java.time.LocalDateTime;

public class ExecutionLogResponseDTO {

    private Long id;
    private Long ruleId;
    private String ruleName;
    private String inputData;
    private boolean conditionMet;
    private String action;
    private boolean success;
    private String errorMessage;
    private LocalDateTime executedAt;

    public ExecutionLogResponseDTO() {}

    public ExecutionLogResponseDTO(Long id, Long ruleId, String ruleName, String inputData,
                                    boolean conditionMet, String action, boolean success,
                                    String errorMessage, LocalDateTime executedAt) {
        this.id = id;
        this.ruleId = ruleId;
        this.ruleName = ruleName;
        this.inputData = inputData;
        this.conditionMet = conditionMet;
        this.action = action;
        this.success = success;
        this.errorMessage = errorMessage;
        this.executedAt = executedAt;
    }

    public Long getId() { return id; }
    public Long getRuleId() { return ruleId; }
    public String getRuleName() { return ruleName; }
    public String getInputData() { return inputData; }
    public boolean isConditionMet() { return conditionMet; }
    public String getAction() { return action; }
    public boolean isSuccess() { return success; }
    public String getErrorMessage() { return errorMessage; }
    public LocalDateTime getExecutedAt() { return executedAt; }
}
