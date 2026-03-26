package com.sabes.workflow.rule_engine.api.dto;

import java.time.LocalDateTime;

public class RuleResponseDTO {

    private Long id;
    private String name;
    private String priority;
    private String condition;
    private String action;
    private boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String webhookUrl;

    public RuleResponseDTO() {}

    public RuleResponseDTO(Long id, String name, String priority, String condition,
                           String action, boolean active, LocalDateTime createdAt, LocalDateTime updatedAt,
                           String webhookUrl) {
        this.id = id;
        this.name = name;
        this.priority = priority;
        this.condition = condition;
        this.action = action;
        this.active = active;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.webhookUrl = webhookUrl;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getPriority() { return priority; }
    public String getCondition() { return condition; }
    public String getAction() { return action; }
    public boolean isActive() { return active; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public String getWebhookUrl() { return webhookUrl; }
}
