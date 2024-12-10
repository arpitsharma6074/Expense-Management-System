package com.example.demo.service;

import com.example.demo.model.Expense;
import com.example.demo.model.Notification;
import com.example.demo.repository.UserExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserExpenseServiceImpl implements UserExpenseService {

    @Autowired
    private UserExpenseRepository userExpenseRepository;

    private Long nextId = 1L;

    @Autowired
    private NotificationService notificationService;

    @Override
    public String createExpense(Expense expense) {
        expense.setExpenseId(nextId++);
        userExpenseRepository.save(expense);

        Notification notification = new Notification();
        notification.setUserId(expense.getUserId());
        notification.setMessage("A new expense has been added.");
        notificationService.createNotification(notification);

        return "success";
    }

    @Override
    public List<Expense> getAllExpense() {
        return userExpenseRepository.findAll();
    }

    @Override
    public String removeUserExpense(Long expenseId) {
        Optional<Expense> expense = userExpenseRepository.findById(expenseId);
        if (expense.isPresent()) {
            userExpenseRepository.delete(expense.get());
            return "deleted";
        } else {
            return "Expense not found";
        }
    }

    @Override
    @Transactional
    public String updateExpense(Long expenseId) {
        Optional<Expense> expense = userExpenseRepository.findById(expenseId);
        if (expense.isPresent()) {
            Expense partial = expense.get();
            partial.setStatus("Approved");
            userExpenseRepository.save(partial);

        } else {
            throw new RuntimeException("Expense with ID " + expenseId + " not found");
        }
        return "sucess";
    }

    @Override
    @Transactional
    public String rejectExpenses(Long expenseId) {
        Optional<Expense> expense = userExpenseRepository.findById(expenseId);
        if (expense.isPresent()) {
            Expense partial = expense.get();
            partial.setStatus("Rejected");
            userExpenseRepository.save(partial);

        } else {
            throw new RuntimeException("Expense with ID " + expenseId + " not found");
        }
        return "sucess";
    }
}
