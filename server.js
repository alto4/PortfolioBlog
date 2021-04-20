const express = require("express");
const app = express();
// Import article router
const articleRouter = require("./routes/articles");

// Use ejs view engine to convert/render views to HTML
app.set("view engine", "ejs");

app.use("/articles", articleRouter);

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

app.listen(5000);
