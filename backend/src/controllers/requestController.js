const Request = require("../models/Request");
const Notification = require("../models/Notification");

const requestController = {
  async create(req, res, next) {
    try {
      const { type, description, unit, address } = req.body;

      // Generate request ID
      const timestamp = Date.now();
      const id = `REQ-${timestamp}`;

      const request = await Request.create({
        id,
        user_id: req.user.id,
        type,
        description,
        unit,
        address,
        priority: "Medium",
        status: "pending",
      });

      // Create notification for all admins
      const db = require("../database/connection");
      const admins = await db.all("SELECT id FROM users WHERE role = 'admin'");
      for (const admin of admins) {
        await Notification.create({
          user_id: admin.id,
          type: "new_request",
          title: "New Maintenance Request",
          message: `New ${type} request from unit ${unit || "N/A"}`,
        });
      }

      res.status(201).json(request);
    } catch (error) {
      next(error);
    }
  },

  async getAll(req, res, next) {
    try {
      const filters = {};

      // Homeowners can only see their own requests
      if (req.user.role === "homeowner") {
        filters.user_id = req.user.id;
      }

      // Apply query filters
      if (req.query.status) filters.status = req.query.status;
      if (req.query.type) filters.type = req.query.type;
      if (req.query.priority) filters.priority = req.query.priority;

      const requests = await Request.findAll(filters);
      res.json(requests);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const request = await Request.findById(req.params.id);

      if (!request) {
        return res.status(404).json({ error: "Request not found" });
      }

      // Check authorization
      if (req.user.role === "homeowner" && request.user_id !== req.user.id) {
        return res.status(403).json({ error: "Unauthorized access" });
      }

      res.json(request);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const request = await Request.findById(req.params.id);

      if (!request) {
        return res.status(404).json({ error: "Request not found" });
      }

      // Only admins can update requests
      if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Unauthorized access" });
      }

      const updateData = {};
      const allowedFields = [
        "priority",
        "status",
        "assigned_technician",
        "technician_notes",
        "completion_notes",
        "completed_date",
      ];

      allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) {
          updateData[field] = req.body[field];
        }
      });

      const updatedRequest = await Request.update(req.params.id, updateData);

      // Create notification for homeowner based on what changed
      let notificationMessage = `Your ${request.type} request has been updated`;
      let notificationTitle = "Request Updated";

      if (req.body.status) {
        switch (req.body.status) {
          case "in-progress":
            notificationTitle = "Request In Progress";
            notificationMessage = `Your ${request.type} request is now being worked on`;
            break;
          case "completed":
            notificationTitle = "Request Completed";
            notificationMessage = `Your ${request.type} request has been completed`;
            break;
          case "pending":
            notificationTitle = "Request Pending";
            notificationMessage = `Your ${request.type} request is pending review`;
            break;
        }
      } else if (req.body.assigned_technician) {
        notificationTitle = "Technician Assigned";
        notificationMessage = `Technician ${req.body.assigned_technician} assigned to your ${request.type} request`;
      } else if (req.body.priority) {
        notificationTitle = "Priority Updated";
        notificationMessage = `Your ${request.type} request priority changed to ${req.body.priority}`;
      }

      await Notification.create({
        user_id: request.user_id,
        type: "request_update",
        title: notificationTitle,
        message: notificationMessage,
      });

      res.json(updatedRequest);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const request = await Request.findById(req.params.id);

      if (!request) {
        return res.status(404).json({ error: "Request not found" });
      }

      // Check authorization
      if (req.user.role === "homeowner" && request.user_id !== req.user.id) {
        return res.status(403).json({ error: "Unauthorized access" });
      }

      await Request.delete(req.params.id);
      res.json({ message: "Request deleted successfully" });
    } catch (error) {
      next(error);
    }
  },

  async getStats(req, res, next) {
    try {
      // Only admins can view stats
      if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Unauthorized access" });
      }

      const stats = await Request.getStats();
      res.json(stats);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = requestController;
