package com.momenton.test.web;

import com.momenton.test.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@AllArgsConstructor
@RequestMapping("/company/")
public class EmployeeController {
    private EmployeeService employeeService;

    @GetMapping("/ceo")
    public String ceo(Model model) {
        return "ceo";
    }
}
