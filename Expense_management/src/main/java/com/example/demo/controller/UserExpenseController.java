    package com.example.demo.controller;
    import com.example.demo.model.Expense;
    import com.example.demo.service.UserExpenseService;
    import com.example.demo.service.UserService;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;

    @RestController
    @RequestMapping("/api/user")
    @CrossOrigin(origins = "http//localhost:1234")
    public class UserExpenseController {

        @Autowired
        private UserExpenseService userExpenseService;
        @Autowired
        private UserService userService;

        @PostMapping("/{userId}/expense/add")
        public ResponseEntity<List<Expense>> addUserExpense(@RequestBody Expense expense, @PathVariable Long userId) {
            expense.setUserId(userId);
            expense.setUserName(userService.getUserById(userId).getUserName());
            expense.setStatus("Pending");
            String respose = userExpenseService.createExpense(expense);
            return ResponseEntity.ok(userExpenseService.getAllExpense());
        }

        @DeleteMapping("/{userId}/expense/delete/{expenseId}")
        public ResponseEntity<List<Expense>> deleteUserExpense(@PathVariable Long userId, @PathVariable Long expenseId) {
            userExpenseService.removeUserExpense(expenseId);
            return ResponseEntity.ok(userExpenseService.getAllExpense());
        }


        @GetMapping("/{userId}/expense/all")
        public List<Expense> allExpensesOfUser(@PathVariable Long userId) {
            List<Expense> allExpense = userExpenseService.getAllExpense();
            List<Expense> valid = allExpense.stream()
                    .filter(res -> res.getUserId().equals(userId))
                    .toList();
            return valid;
        }

    }
