package com.example.demo.controller;

import com.example.demo.model.Notification;
import com.example.demo.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/user")
@CrossOrigin(origins = "http://localhost:1234")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;

    @PostMapping("/{userId}/notification/add")
    public ResponseEntity<Notification> addNotification(@RequestBody Notification notification, @PathVariable Long userId) {
        notification.setUserId(userId);
        Notification createdNotification = notificationService.createNotification(notification);
        return ResponseEntity.ok(createdNotification);
    }

    @GetMapping("/{userId}/notification/all")
    public ResponseEntity<List<Notification>> getAllNotifications(@PathVariable Long userId) {
        List<Notification> notifications = notificationService.getNotifications(userId);
        return ResponseEntity.ok(notifications);
    }

    @PutMapping("/{userId}/notification/mark-all-read")
    public ResponseEntity<Void> markAllNotificationsAsRead(@PathVariable Long userId) {
        notificationService.markAllNotificationsAsRead(userId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{userId}/notification/delete/{notificationId}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long userId, @PathVariable Long notificationId) {
        notificationService.deleteNotification(notificationId);
        return ResponseEntity.ok().build();
    }
}