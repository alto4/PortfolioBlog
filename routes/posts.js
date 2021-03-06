const express = require("express");
const router = express.Router();

// Import Article model
const Article = require("../models/article");

// GET --> NEW BLOG POST ROUTE
router.get("/new", (req, res) => {
  res.render("posts/new", { article: new Article() });
});

// GET --> EDIT BLOG POST ROUTE
router.get("/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("posts/edit", { article: article });
});

// GET --> SINGLE BLOG POST ROUTE
router.get("/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);

  // If theres an error finding by id, redirect user to the homepage
  if (article == null) {
    res.redirect("/");
  }

  res.render("posts/show", { article: article });
});

// POST --> NEW BLOG POST ROUTE
router.post(
  "/",
  async (req, res, next) => {
    req.article = new Article();
    next();
  },
  saveArticleAndRedirect("new")
);

// PUT --> EDIT BLOG POST ROUTE
router.put(
  "/:id",
  async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
  },
  saveArticleAndRedirect("edit")
);

// DELETE --> BLOG POST ROUTE
router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/blog");
});

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    // Process new blog post
    let article = req.article;

    // Pass in options from form
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;

    try {
      // Redirect to newly posted post if succesful
      article = await article.save();
      res.redirect(`/posts/${article.id}`);
    } catch (err) {
      // Refill form in case of invalid entry
      res.render(`posts/${path}`, { article: article });
    }
  };
}

module.exports = router;
