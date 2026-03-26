package com.sabes.workflow.rule_engine.api.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaForwardController {

    @GetMapping({"/", "/login", "/dashboard", "/dashboard/**"})
    public String forwardToSpa() {
        return "forward:/index.html";
    }
}
