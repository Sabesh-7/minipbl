package com.sabes.workflow.rule_engine.api.controller;

import com.sabes.workflow.rule_engine.api.dto.AuthRequestDTO;
import com.sabes.workflow.rule_engine.api.dto.AuthResponseDTO;
import com.sabes.workflow.rule_engine.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public AuthResponseDTO login(@Valid @RequestBody AuthRequestDTO request) {
        return authService.login(request);
    }
}
