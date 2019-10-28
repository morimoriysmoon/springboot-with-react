package com.momenton.test.repository;

import com.momenton.test.domain.Employee;

import java.util.List;

public interface EmployeeRepositoryCustom {
    List<Employee> findMembersByManager(Long managerId);

    Employee findCEO();

    Employee findEmployeeByName(String name);
}
