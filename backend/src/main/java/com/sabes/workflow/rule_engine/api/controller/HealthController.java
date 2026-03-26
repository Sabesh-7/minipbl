package com.sabes.workflow.rule_engine.api.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class HealthController {
    @GetMapping("/api/v1/health")
    public String healthCheck() {
        return "OK";
    }
}
