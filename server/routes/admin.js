// Import required modules for authentication
const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

// Initialise the constants for authentication
const adminLayout = "../views/layouts/admin";
const jwtSecret = process.env.JWT_SECRET_KEY;
const LOCALS = {
  title: "Admin",
  description: "Simple Blog created with NodeJS, Express & MongoDB.",
};

// Admin - Check Login
const authValidator = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// GET - Admin Login Page
router.get("/admin", async (req, res) => {
  try {
    const locals = LOCALS;

    res.render("admin/index", { locals, layout: adminLayout });
  } catch (err) {
    console.log(err);
  }
});

// POST - Check Admin Login
router.post("/admin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });

    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
  }
});

// POST - ADMIN REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({ username, password: hashedPassword });
      res.status(201).json({ message: "User Created", user });
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({ message: "User already in use" });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  } catch (error) {
    console.log(error);
  }
});

// GET - ADMIN LOGOUT
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

// GET - ADMIN DASHBOARD
router.get("/dashboard", authValidator, async (req, res) => {
  try {
    const locals = LOCALS;

    const data = await Post.find();

    res.render("admin/dashboard", {
      locals,
      data,
      layout: adminLayout,
    });
  } catch (err) {
    console.error(err);
  }
});

// GET - CREATE-POST
router.get("/create-post", authValidator, async (req, res) => {
  try {
    const locals = LOCALS;

    res.render("admin/create-post", { locals, layout: adminLayout });
  } catch (err) {
    console.log(err);
  }
});

// POST - CREATE-POST
router.post("/create-post", authValidator, async (req, res) => {
  try {
    await Post.create({ title: req.body.title, body: req.body.body });
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.redirect("/create-post");
  }
});

// GET - EDIT POST - :id
router.get("/edit-post/:id", authValidator, async (req, res) => {
  try {
    const locals = LOCALS;

    let slug = req.params.id;

    const post = await Post.findOne({ _id: slug });

    res.render("admin/edit-post", {
      locals,
      post,
      layout: adminLayout,
    });
  } catch (err) {
    console.log(err);
  }
});

// PUT - EDIT POST - :id
router.put("/edit-post/:id", authValidator, async (req, res) => {
  try {
    let slug = req.params.id;

    await Post.findByIdAndUpdate(slug, {
      title: req.body.title,
      body: req.body.body,
    });

    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
  }
});

// DELETE - DELETE POST - :id
router.delete("/delete-post/:id", authValidator, async (req, res) => {
  try {
    let slug = req.params.id;

    await Post.deleteOne({ _id: slug });

    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
