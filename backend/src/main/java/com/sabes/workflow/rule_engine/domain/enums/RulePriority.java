package com.sabes.workflow.rule_engine.domain.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum RulePriority {
    LOW, MEDIUM, HIGH, CRITICAL;

    @JsonCreator
    public static RulePriority fromString(String value) {
        return RulePriority.valueOf(value.toUpperCase());
    }

    @JsonValue
    public String toJson() {
        return this.name().toLowerCase();
    }
}
