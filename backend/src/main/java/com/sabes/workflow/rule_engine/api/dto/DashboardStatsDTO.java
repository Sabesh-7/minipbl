package com.sabes.workflow.rule_engine.api.dto;

import java.util.List;

public class DashboardStatsDTO {

    private long totalRules;
    private long activeRules;
    private long executionsToday;
    private long totalExecutions;
    private double successRate;
    private List<RecentExecutionDTO> recentExecutions;

    public DashboardStatsDTO() {}

    public DashboardStatsDTO(long totalRules, long activeRules, long executionsToday,
                              long totalExecutions, double successRate,
                              List<RecentExecutionDTO> recentExecutions) {
        this.totalRules = totalRules;
        this.activeRules = activeRules;
        this.executionsToday = executionsToday;
        this.totalExecutions = totalExecutions;
        this.successRate = successRate;
        this.recentExecutions = recentExecutions;
    }

    public long getTotalRules() { return totalRules; }
    public long getActiveRules() { return activeRules; }
    public long getExecutionsToday() { return executionsToday; }
    public long getTotalExecutions() { return totalExecutions; }
    public double getSuccessRate() { return successRate; }
    public List<RecentExecutionDTO> getRecentExecutions() { return recentExecutions; }
}
