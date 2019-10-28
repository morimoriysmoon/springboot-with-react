package com.momenton.test.service;

import com.momenton.test.domain.Employee;
import com.momenton.test.repository.EmployeeRepository;
import com.momenton.test.dto.EmployeeDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class EmployeeService {
    private EmployeeRepository employeeRepository;

    private void addMembers(EmployeeDto manager) {
        // recursive
        List<Employee> members = employeeRepository.findMembersByManager(manager.getId());

        if (members == null || members.size() == 0) {
            return;
        }

        List<EmployeeDto> dtoMembers = members.stream().map(EmployeeDto::new).collect(Collectors.toList());
        manager.setMembers(dtoMembers);

        for (EmployeeDto dto : dtoMembers) {
            this.addMembers(dto);
        }
    }

    @Transactional(readOnly = true)
    public Employee findEmployeeByName(String name) {
        return employeeRepository.findEmployeeByName(name);
    }

    @Transactional(readOnly = true)
    public EmployeeDto populateMembersOfCeo() {
        Employee CEO = employeeRepository.findCEO();
        EmployeeDto ceo = new EmployeeDto(CEO);
        addMembers(ceo);
        return ceo;
    }

    @Transactional
    public void save(Employee employee) {
        employeeRepository.save(employee);
    }
}
