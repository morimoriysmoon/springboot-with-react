package com.momenton.test.repository;

import com.momenton.test.domain.User;

public interface UserRepositoryCustom {
    User findByUsername(String username);
}
