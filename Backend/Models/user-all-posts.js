const mongoose = require("mongoose");
const post_model = require("./post");

const user_posts = mongoose.Schema({
  email: { type: String },
  posts: [post_model.schema],
});

const user_all_posts = mongoose.model("user_all_posts", user_posts);

module.exports = user_all_posts;
