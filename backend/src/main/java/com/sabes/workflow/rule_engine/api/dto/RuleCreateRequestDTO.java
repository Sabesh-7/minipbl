package com.sabes.workflow.rule_engine.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class RuleCreateRequestDTO {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Priority is required")
    @Pattern(regexp = "(?i)low|medium|high|critical", message = "Priority must be low, medium, high, or critical")
    private String priority;

    @NotBlank(message = "Condition is required")
    private String condition;

    @NotBlank(message = "Action is required")
    private String action;

    private boolean active = true;

    private String webhookUrl;

    public RuleCreateRequestDTO() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public String getCondition() { return condition; }
    public void setCondition(String condition) { this.condition = condition; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }

    public String getWebhookUrl() { return webhookUrl; }
    public void setWebhookUrl(String webhookUrl) { this.webhookUrl = webhookUrl; }
}
