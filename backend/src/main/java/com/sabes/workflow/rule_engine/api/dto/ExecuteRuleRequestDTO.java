package com.sabes.workflow.rule_engine.api.dto;

import jakarta.validation.constraints.NotNull;

import java.util.Map;

public class ExecuteRuleRequestDTO {

    @NotNull(message = "Input data is required")
    private Map<String, Object> input;

    public ExecuteRuleRequestDTO() {}

    public Map<String, Object> getInput() { return input; }
    public void setInput(Map<String, Object> input) { this.input = input; }
}
