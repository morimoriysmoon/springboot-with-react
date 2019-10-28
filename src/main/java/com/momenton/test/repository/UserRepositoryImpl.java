package com.momenton.test.repository;

import com.momenton.test.domain.QUser;
import com.momenton.test.domain.User;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepositoryCustom {
    private final JPAQueryFactory jpaQueryFactory;
    private final QUser user = QUser.user;

    @Override
    public User findByUsername(String username) {
        return jpaQueryFactory.selectFrom(user)
                .where(user.username.equalsIgnoreCase(username))
                .fetchOne();
    }
}
