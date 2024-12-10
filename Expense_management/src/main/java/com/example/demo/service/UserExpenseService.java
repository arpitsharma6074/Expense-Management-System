package com.example.demo.service;

import com.example.demo.model.Expense;


import java.util.List;

public interface UserExpenseService {
    public String createExpense(Expense expanse );

    public List<Expense> getAllExpense();

    String removeUserExpense(Long expenseId);

    String updateExpense(Long expenseId);

    String rejectExpenses(Long expenseId);
}
