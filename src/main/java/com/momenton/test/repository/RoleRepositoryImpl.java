package com.momenton.test.repository;

import com.momenton.test.domain.QRole;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class RoleRepositoryImpl implements RoleRepositoryCustom {
    private final JPAQueryFactory jpaQueryFactory;
    private final QRole role = QRole.role;
}
