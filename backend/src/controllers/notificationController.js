const Notification = require("../models/Notification");

const notificationController = {
  async getAll(req, res, next) {
    try {
      const filters = {};

      if (req.query.is_read !== undefined) {
        filters.is_read = req.query.is_read === "true";
      }

      const notifications = await Notification.findByUserId(
        req.user.id,
        filters
      );
      res.json(notifications);
    } catch (error) {
      next(error);
    }
  },

  async markAsRead(req, res, next) {
    try {
      const notification = await Notification.findById(req.params.id);

      if (!notification) {
        return res.status(404).json({ error: "Notification not found" });
      }

      // Check authorization
      if (notification.user_id !== req.user.id) {
        return res.status(403).json({ error: "Unauthorized access" });
      }

      const updatedNotification = await Notification.markAsRead(req.params.id);
      res.json(updatedNotification);
    } catch (error) {
      next(error);
    }
  },

  async markAllAsRead(req, res, next) {
    try {
      await Notification.markAllAsRead(req.user.id);
      res.json({ message: "All notifications marked as read" });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const notification = await Notification.findById(req.params.id);

      if (!notification) {
        return res.status(404).json({ error: "Notification not found" });
      }

      // Check authorization
      if (notification.user_id !== req.user.id) {
        return res.status(403).json({ error: "Unauthorized access" });
      }

      await Notification.delete(req.params.id);
      res.json({ message: "Notification deleted successfully" });
    } catch (error) {
      next(error);
    }
  },

  async getUnreadCount(req, res, next) {
    try {
      const count = await Notification.getUnreadCount(req.user.id);
      res.json({ count });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = notificationController;
