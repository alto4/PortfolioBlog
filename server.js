const express = require("express");
const mongoose = require("mongoose");
const app = express();
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
app.get("/", (req, res, err) => {
  // Articles placeholder
  const articles = [
    {
      title: "Day 0: Getting Prepared",
      createdAt: new Date(),
      description: "Getting ready for the 100 Days of Code Challenge.",
    },
  ];

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
