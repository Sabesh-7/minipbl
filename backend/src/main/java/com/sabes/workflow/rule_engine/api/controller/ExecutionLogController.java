package com.sabes.workflow.rule_engine.api.controller;

import com.sabes.workflow.rule_engine.api.dto.ExecutionLogResponseDTO;
import com.sabes.workflow.rule_engine.service.ExecutionLogService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/logs")
public class ExecutionLogController {

    private final ExecutionLogService executionLogService;

    public ExecutionLogController(ExecutionLogService executionLogService) {
        this.executionLogService = executionLogService;
    }

    @GetMapping
    public Page<ExecutionLogResponseDTO> getLogs(
            @RequestParam(required = false, defaultValue = "") String search,
            @RequestParam(required = false, defaultValue = "") String status,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int size) {
        return executionLogService.getLogs(search, status, page, size);
    }
}
