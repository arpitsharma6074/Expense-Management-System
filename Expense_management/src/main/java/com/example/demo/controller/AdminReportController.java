package com.example.demo.controller;
import com.example.demo.model.Reports;
import com.example.demo.service.UserReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/admin")
@CrossOrigin(origins = "http//localhost:1234")
public class AdminReportController {

    @Autowired
    private UserReportService userReportService ;

    @GetMapping("/report/getreports")
    public List<Reports> getAllReports(){
        List<Reports> all = userReportService.getAllReports();
        return all;
    }
}
