const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const notifications = [];

/**
 * Find notification by ID
 */
const getNotificationById = (id) => {
  return notifications.find((notification) => notification.id === Number(id));
};

/**
 * Create Notification
 */
app.post("/notifications", (req, res) => {
  const { id, type, message, timestamp } = req.body;

  if (!id || !type || !message || !timestamp) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const existingNotification = getNotificationById(id);

  if (existingNotification) {
    return res.status(409).json({
      success: false,
      message: "Notification already exists",
    });
  }

  const notification = {
    id: Number(id),
    type,
    message,
    timestamp,
    isRead: false,
  };

  notifications.push(notification);

  return res.status(201).json({
    success: true,
    message: "Notification created successfully",
    notification,
  });
});

/**
 * Get Notifications
 * Supports filtering and pagination
 */
app.get("/notifications", (req, res) => {
  const { type, page = 1, limit = 5 } = req.query;

  let filteredNotifications = [...notifications];

  if (type) {
    filteredNotifications = filteredNotifications.filter(
      (notification) =>
        notification.type.toLowerCase() === type.toLowerCase()
    );
  }

  filteredNotifications.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  const startIndex = (Number(page) - 1) * Number(limit);
  const endIndex = startIndex + Number(limit);

  const paginatedNotifications = filteredNotifications.slice(
    startIndex,
    endIndex
  );

  return res.status(200).json({
    success: true,
    total: filteredNotifications.length,
    page: Number(page),
    limit: Number(limit),
    notifications: paginatedNotifications,
  });
});

/**
 * Get Unread Notifications
 */
app.get("/notifications/unread", (req, res) => {
  const unreadNotifications = notifications.filter(
    (notification) => !notification.isRead
  );

  return res.status(200).json({
    success: true,
    count: unreadNotifications.length,
    notifications: unreadNotifications,
  });
});

/**
 * Get Notification By ID
 */
app.get("/notifications/:id", (req, res) => {
  const notification = getNotificationById(req.params.id);

  if (!notification) {
    return res.status(404).json({
      success: false,
      message: "Notification not found",
    });
  }

  return res.status(200).json({
    success: true,
    notification,
  });
});

/**
 * Update Notification
 */
app.patch("/notifications/:id", (req, res) => {
  const notification = getNotificationById(req.params.id);

  if (!notification) {
    return res.status(404).json({
      success: false,
      message: "Notification not found",
    });
  }

  const { type, message, timestamp } = req.body;

  if (type) notification.type = type;
  if (message) notification.message = message;
  if (timestamp) notification.timestamp = timestamp;

  return res.status(200).json({
    success: true,
    message: "Notification updated successfully",
    notification,
  });
});

/**
 * Mark Notification As Read
 */
app.patch("/notifications/:id/read", (req, res) => {
  const notification = getNotificationById(req.params.id);

  if (!notification) {
    return res.status(404).json({
      success: false,
      message: "Notification not found",
    });
  }

  notification.isRead = true;

  return res.status(200).json({
    success: true,
    message: "Notification marked as read",
    notification,
  });
});

/**
 * Delete Notification
 */
app.delete("/notifications/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = notifications.findIndex(
    (notification) => notification.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Notification not found",
    });
  }

  notifications.splice(index, 1);

  return res.status(200).json({
    success: true,
    message: "Notification deleted successfully",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});