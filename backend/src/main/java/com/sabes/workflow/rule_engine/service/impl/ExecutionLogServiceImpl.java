package com.sabes.workflow.rule_engine.service.impl;

import com.sabes.workflow.rule_engine.api.dto.ExecutionLogResponseDTO;
import com.sabes.workflow.rule_engine.domain.entity.ExecutionLog;
import com.sabes.workflow.rule_engine.domain.repository.ExecutionLogRepository;
import com.sabes.workflow.rule_engine.service.ExecutionLogService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class ExecutionLogServiceImpl implements ExecutionLogService {

    private final ExecutionLogRepository executionLogRepository;

    public ExecutionLogServiceImpl(ExecutionLogRepository executionLogRepository) {
        this.executionLogRepository = executionLogRepository;
    }

    @Override
    public Page<ExecutionLogResponseDTO> getLogs(String search, String status, int page, int size) {
        Boolean successFilter = null;
        if ("success".equalsIgnoreCase(status)) successFilter = true;
        else if ("failed".equalsIgnoreCase(status)) successFilter = false;

        String searchParam = (search != null && !search.isBlank()) ? search : null;

        return executionLogRepository
                .findWithFilters(searchParam, successFilter, PageRequest.of(page, size))
                .map(this::toDTO);
    }

    private ExecutionLogResponseDTO toDTO(ExecutionLog log) {
        return new ExecutionLogResponseDTO(
                log.getId(),
                log.getRuleId(),
                log.getRuleName(),
                log.getInputData(),
                log.isConditionMet(),
                log.getAction(),
                log.isSuccess(),
                log.getErrorMessage(),
                log.getExecutedAt()
        );
    }
}
