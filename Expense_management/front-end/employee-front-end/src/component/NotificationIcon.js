import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import deleteIcon from "../assets/delete.png";

const NotificationIcon = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [error, setError] = useState("");
  const dropdownRef = useRef(null);

  const API_BASE_URL = `http://localhost:9898/api/user/${userId}/notification`;

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/all`);
      const fetchedNotifications = response.data;
      setNotifications(fetchedNotifications);

      const unread = fetchedNotifications.filter((notification) => !notification.isRead);
      setUnreadCount(unread.length);
    } catch (err) {
      console.error("Failed to fetch notifications:", err.message);
      setError("Failed to fetch notifications.");
      setTimeout(() => setError(""), 3000); // Clear error after 3 seconds
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.put(`${API_BASE_URL}/mark-all-read`);
      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );
      setUnreadCount(0);
    } catch (err) {
      console.error("Failed to mark notifications as read:", err.message);
      setError("Failed to mark notifications as read.");
      setTimeout(() => setError(""), 3000);
    }
  };
  const deleteNotification = async (notificationId) => {
    try {
        await axios.delete(`${API_BASE_URL}/delete/${notificationId}`);
        setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification.notificationId !== notificationId)
        );
    } catch (err) {
        console.error("Failed to delete notification:", err.message);
        setError("Failed to delete notification.");
        setTimeout(() => setError(""), 3000);
    }
  };

  
  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={toggleDropdown}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          position: "relative",
          padding: "5px",
          transition: "transform 0.3s ease",
        }}
      >
        <span
          style={{
            fontSize: "22px",
            color: unreadCount > 0 ? "#ff6f61" : "#333",
            transition: "color 0.3s ease",
          }}
        >
          🔔
        </span>
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-6px",
              right: "-6px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: "12px",
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {isDropdownVisible && (
        <div
          ref={dropdownRef}
          style={{
            position: "absolute",
            top: "35px",
            right: "0",
            background: "white",
            border: "1px solid #ccc",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            width: "300px",
            maxHeight: "300px",
            overflowY: "auto",
            borderRadius: "8px",
          }}
        >
          <button
            onClick={markAllAsRead}
            style={{
              display: "block",
              background: "#007bff",
              color: "white",
              padding: "10px",
              textAlign: "center",
              width: "100%",
              border: "none",
              cursor: "pointer",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              fontSize: "16px",
            }}
          >
            Mark All as Read
          </button>
          {notifications.length === 0 ? (
            <p style={{ padding: "10px", textAlign: "center" }}>No notifications</p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.notificationId}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #f1f1f1",
                  backgroundColor: notification.isRead ? "#f9f9f9" : "#e6f7ff",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <p style={{ color: "black", margin: 2}}>{notification.message}</p> {/* Set the text color to black */}
                  <small style={{ color: "black" }}>{new Date(notification.createdAt).toLocaleString()}</small>
                </div>
                <button
                  onClick={() => deleteNotification(notification.notificationId)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    }}
                  >
                    <img
                    src={deleteIcon}
                    alt="Delete"
                    style={{
                      width: "16px",
                      height: "16px",
                    }}
                    />
                </button>

              </div>
            ))
          )}
        </div>
      )}

      {error && (
        <div
          style={{
            position: "absolute",
            top: "-30px",
            right: "0",
            background: "red",
            color: "white",
            padding: "5px 10px",
            borderRadius: "4px",
            fontSize: "12px",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;