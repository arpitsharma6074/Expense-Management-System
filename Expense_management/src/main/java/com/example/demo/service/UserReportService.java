package com.example.demo.service;
import com.example.demo.model.Reports;

import java.util.List;

public interface UserReportService {

    public List<Reports> getReports(Long userId);

    List<Reports> createReport(Reports reports);

    List<Reports> removeUserReport(Long reportId);

    List<Reports> getAllReports();
}
