package com.example.demo.controller;

import com.example.demo.model.Category;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/admin")
@CrossOrigin(origins = "http//localhost:1234")
public class AdminCategoryController {

    @Autowired
    private CategoryService categoryService;
    @GetMapping("/category/getcategories")
    public List<Category> getAllCategory(){
        List<Category> all = categoryService.getCategories();
        return all;
    }

}
