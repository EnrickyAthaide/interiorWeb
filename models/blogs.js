
// models/blog.js
const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name:  String,
  role:  String,
  image: String
}, { _id: false });

const nextArticleSchema = new mongoose.Schema({
  title: String,
  link:  String,
  image: String
}, { _id: false });

const relatedPostSchema = new mongoose.Schema({
  title: String,
  link:  String
}, { _id: false });

const blogSchema = new mongoose.Schema({
  slug: {
    type:     String,
    required: true,
    unique:   true
  },
  title:        String,
  subtitle:     String,         // <-- fixed typo here
  category:     String,
  date:         String,
  heroImage:    String,
  contentImages:[String],
  author:       authorSchema,
  relatedPosts: [relatedPostSchema],
  nextArticle:  nextArticleSchema
});

module.exports = mongoose.model('Blog', blogSchema);
