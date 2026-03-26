package com.sabes.workflow.rule_engine.service;

import com.sabes.workflow.rule_engine.api.dto.AuthRequestDTO;
import com.sabes.workflow.rule_engine.api.dto.AuthResponseDTO;

public interface AuthService {
    AuthResponseDTO login(AuthRequestDTO request);
}
