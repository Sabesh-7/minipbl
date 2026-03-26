package com.sabes.workflow.rule_engine.service.impl;

import com.sabes.workflow.rule_engine.api.dto.DashboardStatsDTO;
import com.sabes.workflow.rule_engine.api.dto.RecentExecutionDTO;
import com.sabes.workflow.rule_engine.domain.entity.ExecutionLog;
import com.sabes.workflow.rule_engine.domain.repository.ExecutionLogRepository;
import com.sabes.workflow.rule_engine.domain.repository.RuleRepository;
import com.sabes.workflow.rule_engine.service.DashboardService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class DashboardServiceImpl implements DashboardService {

    private final RuleRepository ruleRepository;
    private final ExecutionLogRepository executionLogRepository;

    public DashboardServiceImpl(RuleRepository ruleRepository,
                                ExecutionLogRepository executionLogRepository) {
        this.ruleRepository = ruleRepository;
        this.executionLogRepository = executionLogRepository;
    }

    @Override
    public DashboardStatsDTO getStats() {
        long totalRules = ruleRepository.count();
        long activeRules = ruleRepository.countByActive(true);

        LocalDateTime todayStart = LocalDate.now().atStartOfDay();
        long executionsToday = executionLogRepository.countByExecutedAtAfter(todayStart);
        long totalExecutions = executionLogRepository.count();

        double successRate = 0.0;
        if (totalExecutions > 0) {
            long successCount = executionLogRepository.countBySuccess(true);
            successRate = Math.round((double) successCount / totalExecutions * 1000.0) / 10.0;
        }

        List<ExecutionLog> recent = executionLogRepository.findTop5ByOrderByExecutedAtDesc();
        List<RecentExecutionDTO> recentDTOs = recent.stream()
                .map(e -> new RecentExecutionDTO(e.getRuleName(), e.isSuccess(), e.isConditionMet(), e.getExecutedAt()))
                .collect(Collectors.toList());

        return new DashboardStatsDTO(totalRules, activeRules, executionsToday, totalExecutions, successRate, recentDTOs);
    }
}
