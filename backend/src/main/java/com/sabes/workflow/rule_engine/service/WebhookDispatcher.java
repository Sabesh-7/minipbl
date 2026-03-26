package com.sabes.workflow.rule_engine.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sabes.workflow.rule_engine.domain.entity.ExecutionLog;
import com.sabes.workflow.rule_engine.domain.entity.Rule;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.LinkedHashMap;
import java.util.Map;

@Component
public class WebhookDispatcher {

    private static final Logger log = LoggerFactory.getLogger(WebhookDispatcher.class);
    private static final ObjectMapper MAPPER = new ObjectMapper();
    private static final HttpClient HTTP_CLIENT = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(5))
            .build();

    /**
     * Fire-and-forget: POST the execution result to the rule's webhookUrl.
     * Runs synchronously but any failure is caught and logged — never
     * propagates back to the caller.
     */
    public void dispatch(Rule rule, Map<String, Object> input, ExecutionLog executionLog) {
        String url = rule.getWebhookUrl();
        if (url == null || url.isBlank()) return;

        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("ruleId", rule.getId());
        payload.put("ruleName", rule.getName());
        payload.put("action", executionLog.getAction());
        payload.put("conditionMet", executionLog.isConditionMet());
        payload.put("input", input);
        payload.put("executedAt", executionLog.getExecutedAt() != null
                ? executionLog.getExecutedAt().toString() : null);

        try {
            String body = MAPPER.writeValueAsString(payload);
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .timeout(Duration.ofSeconds(10))
                    .header("Content-Type", "application/json")
                    .header("User-Agent", "RuleEngine-Webhook/1.0")
                    .POST(HttpRequest.BodyPublishers.ofString(body))
                    .build();

            HTTP_CLIENT.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                    .thenAccept(resp -> log.info("Webhook dispatched to {} — status {}", url, resp.statusCode()))
                    .exceptionally(ex -> {
                        log.warn("Webhook dispatch failed for rule {} to {}: {}", rule.getId(), url, ex.getMessage());
                        return null;
                    });

        } catch (Exception e) {
            log.warn("Webhook payload build failed for rule {}: {}", rule.getId(), e.getMessage());
        }
    }
}
