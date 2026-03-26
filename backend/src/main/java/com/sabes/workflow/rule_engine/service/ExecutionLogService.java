package com.sabes.workflow.rule_engine.service;

import com.sabes.workflow.rule_engine.api.dto.ExecutionLogResponseDTO;
import org.springframework.data.domain.Page;

public interface ExecutionLogService {
    Page<ExecutionLogResponseDTO> getLogs(String search, String status, int page, int size);
}
