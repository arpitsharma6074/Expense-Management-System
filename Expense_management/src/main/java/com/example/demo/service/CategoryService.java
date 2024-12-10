package com.example.demo.service;

import com.example.demo.model.Category;

import java.util.List;

public interface CategoryService {
    public List<Category> getCategories();

    String createCategory(Category category);

    String removeUserCategory(Long categoryId);
}
