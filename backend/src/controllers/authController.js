const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authController = {
  async register(req, res, next) {
    try {
      const {
        email,
        password,
        name,
        role,
        phone,
        address,
        position,
        community,
      } = req.body;

      // Check if user already exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Generate profile image
      const profile_image = `https://api.dicebear.com/7.x/avataaars/png?seed=${name}`;

      // Create user
      const user = await User.create({
        email,
        password: hashedPassword,
        name,
        role,
        phone,
        address: role === "homeowner" ? address : null,
        position: role === "admin" ? position : null,
        community: role === "admin" ? community : null,
        profile_image,
      });

      // Remove password from response
      delete user.password;

      // Generate token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
      );

      res.status(201).json({ user, token });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Remove password from response
      delete user.password;

      // Generate token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
      );

      res.json({ user, token });
    } catch (error) {
      next(error);
    }
  },

  async getCurrentUser(req, res, next) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      delete user.password;
      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  async updateProfile(req, res, next) {
    try {
      const { name, phone, address, position, community, profile_image } =
        req.body;

      const updateData = { name, phone };

      // Handle profile_image (can be string or null)
      if (profile_image !== undefined) {
        updateData.profile_image = profile_image;
      }

      if (req.user.role === "homeowner") {
        updateData.address = address;
      } else if (req.user.role === "admin") {
        updateData.position = position;
        updateData.community = community;
      }

      const user = await User.update(req.user.id, updateData);
      delete user.password;

      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  async changePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;

      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Verify current password
      const isValidPassword = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isValidPassword) {
        return res.status(401).json({ error: "Current password is incorrect" });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update password
      await User.update(req.user.id, { password: hashedPassword });

      res.json({ message: "Password updated successfully" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
