const express = require("express");
const router = express.Router();

// Import Article model
const Article = require("../models/article");

// GET --> NEW BLOG POST ROUTE
router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

// GET --> SINGLE BLOG POST ROUTE
router.get("/:id", async (req, res) => {
  const article = await Article.findOne(req.params.slug);

  // If theres an error finding by id, redirect user to the homepage
  if (article == null) {
    res.redirect("/");
  }

  res.render("articles/show", { article: article });
});

// POST --> NEW BLOG POST ROUTE
router.post("/", async (req, res) => {
  // Process new blog post
  let article = new Article({
    // Pass in options from form
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });

  try {
    // Redirect to newly posted post if succesful
    article = await article.save();
    res.redirect(`/articles/${article.slug}`);
  } catch (err) {
    // Refill form in case of invalid entry
    res.render("articles/new", { article: article });
  }
});

// DELETE --> BLOG POST ROUTE
router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

module.exports = router;
