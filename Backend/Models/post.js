const mongoose = require("mongoose");

const post_schema = mongoose.Schema({
  title: { type: String },
  message: { type: String },
  date: { type: String },
  isLiked: { type: Boolean },
  first_name: { type: String },
});

const post_model = mongoose.model("user-posts", post_schema);

module.exports = post_model;
