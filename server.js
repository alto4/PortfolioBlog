const express = require("express");
const mongoose = require("mongoose");
const app = express();
// Import Article model
const Article = require("./models/article");
// Import article router
const blogPostsRouter = require("./routes/posts");
// Import method-override to allow for processing DELETEs directly from form request
const methodOverride = require("method-override");

let loggedIn = true;

mongoose.connect("mongodb://localhost/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Use ejs view engine to convert/render views to HTML
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// GET HOME ROUTE - default
app.get("/", (req, res, err) => {
  res.render("index");
});

app.get("/blog", async (req, res, err) => {
  // Get all posts and sort by most recenting
  const articles = await Article.find().sort({ createdAt: "descending" });
  res.render("posts/index", { articles: articles, loggedIn: loggedIn });
});

// GET --> ABOUT ROUTE
app.get("/about", (req, res, err) => {
  res.render("about");
});

// GET --> PROJECTS ROUTE
app.get("/projects", (req, res, err) => {
  res.render("projects");
});

// GET --> CONTACT ROUTE
app.get("/contact", (req, res, err) => {
  res.render("contact");
});

app.use("/posts", blogPostsRouter);

app.listen(5000);
