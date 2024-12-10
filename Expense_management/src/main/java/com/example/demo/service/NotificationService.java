package com.example.demo.service;

import com.example.demo.model.Notification;

import java.util.List;

public interface NotificationService {
    List<Notification> getNotifications(Long userId);

    Notification createNotification(Notification notification);

    void markAllNotificationsAsRead(Long userId); // New method

    void deleteNotification(Long notificationId);
}