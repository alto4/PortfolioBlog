const express = require("express");
const mongoose = require("mongoose");
const app = express();
// Import Article model
const Article = require("./models/article");
// Import article router
const articleRouter = require("./routes/articles");

mongoose.connect("mongodb://localhost/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use ejs view engine to convert/render views to HTML
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

// GET HOME ROUTE - default
app.get("/", async (req, res, err) => {
  // Get all posts and sort by most recenting
  const articles = await Article.find().sort({ createdAt: "descending" });
  res.render("articles/index", { articles: articles });
});

// GET ABOUT ROUTE
app.get("/about", (req, res, err) => {
  res.render("about");
});

// GET PROJECTS ROUTE
app.get("/projects", (req, res, err) => {
  res.render("projects");
});

// GET CONTACT ROUTE
app.get("/contact", (req, res, err) => {
  res.render("contact");
});

app.use("/articles", articleRouter);

app.listen(5000);
