package com.example.demo.controller;

import com.example.demo.model.LoginRequest;
import com.example.demo.model.User;
import com.example.demo.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.Banner;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http//localhost:1234")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        userService.createUser(user);
        return ResponseEntity.ok("Registration Successful");
    }


    @PostMapping("/login")
    public  ResponseEntity<User>  userLogin(@RequestBody LoginRequest loginRequest) {
         User user = userService.userLogin(loginRequest);
         return  ResponseEntity.ok(user);
    }


}

