package com.sabes.workflow.rule_engine.api.controller;

import com.sabes.workflow.rule_engine.api.dto.*;
import com.sabes.workflow.rule_engine.service.RuleExecutionService;
import com.sabes.workflow.rule_engine.service.RuleService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rules")
public class RuleController {

    private final RuleService ruleService;
    private final RuleExecutionService ruleExecutionService;

    public RuleController(RuleService ruleService, RuleExecutionService ruleExecutionService) {
        this.ruleService = ruleService;
        this.ruleExecutionService = ruleExecutionService;
    }

    @GetMapping
    public List<RuleResponseDTO> getAllRules() {
        return ruleService.getAllRules();
    }

    @GetMapping("/{id}")
    public RuleResponseDTO getRuleById(@PathVariable Long id) {
        return ruleService.getRuleById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RuleResponseDTO createRule(@Valid @RequestBody RuleCreateRequestDTO request) {
        return ruleService.createRule(request);
    }

    @PutMapping("/{id}")
    public RuleResponseDTO updateRule(@PathVariable Long id,
                                      @Valid @RequestBody RuleUpdateRequestDTO request) {
        return ruleService.updateRule(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRule(@PathVariable Long id) {
        ruleService.deleteRule(id);
    }

    @PatchMapping("/{id}/toggle")
    public RuleResponseDTO toggleRule(@PathVariable Long id) {
        return ruleService.toggleRule(id);
    }

    @PostMapping("/{id}/execute")
    public ExecuteRuleResponseDTO executeRule(@PathVariable Long id,
                                              @Valid @RequestBody ExecuteRuleRequestDTO request) {
        return ruleExecutionService.execute(id, request);
    }
}
