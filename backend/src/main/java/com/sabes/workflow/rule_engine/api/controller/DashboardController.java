package com.sabes.workflow.rule_engine.api.controller;

import com.sabes.workflow.rule_engine.api.dto.DashboardStatsDTO;
import com.sabes.workflow.rule_engine.service.DashboardService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/stats")
    public DashboardStatsDTO getStats() {
        return dashboardService.getStats();
    }
}
