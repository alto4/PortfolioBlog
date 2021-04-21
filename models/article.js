const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  markdown: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    required: false,
    unique: true,
  },
});

// Use Slugify to tidy up blog post ids
articleSchema.pre("validate", function (next) {
  // Eliminate characters that are not url friend, and ensure all are lowercase
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  next();
});

module.exports = mongoose.model("Article", articleSchema);
