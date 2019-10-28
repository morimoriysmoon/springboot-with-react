package com.momenton.test.web;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/react-apps")
public class SimpleReactAppController {

    @GetMapping
    public String index(Model model) {
        return "index";
    }

    @GetMapping("/timer")
    public String timer(Model model, Authentication authentication) {
        return "timer";
    }

    @GetMapping("/calculator")
    public String calculator(Model model) {
        return "calculator";
    }
}
