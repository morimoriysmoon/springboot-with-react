package com.momenton.test.repository;

import com.momenton.test.domain.Employee;
import com.momenton.test.domain.QEmployee;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
public class EmployeeRepositoryImpl implements EmployeeRepositoryCustom {
    private final JPAQueryFactory queryFactory;
    private final QEmployee employee = QEmployee.employee;

    @Override
    public List<Employee> findMembersByManager(Long managerId) {

        Employee manager = queryFactory
                .selectFrom(employee)
                .where(employee.id.eq(managerId))
                .fetchOne();

        if (manager == null) {
            return new ArrayList<>();
        }

        return queryFactory
                .selectFrom(employee)
                .where(employee.manager.eq(manager))
                .orderBy(employee.name.asc())
                .fetch();
    }

    @Override
    public Employee findCEO() {
        return queryFactory
                .selectFrom(employee)
                .where(employee.manager.isNull())
                .fetchOne();
    }

    @Override
    public Employee findEmployeeByName(String name) {
        return queryFactory
                .selectFrom(employee)
                .where(employee.name.likeIgnoreCase(name))
                .fetchOne();
    }
}
