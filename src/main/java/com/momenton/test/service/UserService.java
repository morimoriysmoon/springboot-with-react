package com.momenton.test.service;

import com.momenton.test.domain.User;

public interface UserService {
    void save(User user);

    User findByUsername(String username);
}
