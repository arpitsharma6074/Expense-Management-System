package com.example.demo.service;

import com.example.demo.model.Admin;
import com.example.demo.model.LoginRequest;

public interface AdminService {
    public String createAdmin(Admin admin);
    public Admin adminLogin(LoginRequest loginRequest);
}
