const express = require("express");
const router = express.Router();

// GET NEW BLOG POST ROUTE
router.get("/new", (req, res) => {
  res.render("articles/new");
});

// POST NEW BLOG POST ROUTE
router.post("/", (req, res) => {
  // Process new blog post
});
module.exports = router;
