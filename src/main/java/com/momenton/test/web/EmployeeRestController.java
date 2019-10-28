package com.momenton.test.web;

import com.momenton.test.dto.EmployeeDto;
import com.momenton.test.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class EmployeeRestController {
    private EmployeeService employeeService;

    @GetMapping("/employee/all")
    public EmployeeDto getEmployees(Model model) {
        return employeeService.populateMembersOfCeo();
    }
}
