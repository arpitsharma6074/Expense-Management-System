package com.example.demo.service;

import com.example.demo.model.LoginRequest;
import com.example.demo.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

public interface UserService {
    public User createUser(User user);
    public User getUserById(Long userId);
    public User userLogin(LoginRequest loginRequest);
    public List<User> getAllUser();
}
