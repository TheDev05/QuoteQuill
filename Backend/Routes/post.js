const express = require("express");
const router = express.Router();

const database = require("../db");
const post_model = require("../Models/post");

const user_all_posts = require("../Models/user-all-posts");

router.post("/", async (req, res) => {
  try {
    const day = new Date();
    req.body.date = `${day.getDate()}-${day.getMonth()}-${day.getFullYear()}`;

    await database();
    const collection = post_model;
    const response = await collection.create(req.body);
    console.log(response.email);

    // post details of each post in an array with the email of that user
    const userPostsCollection = user_all_posts;
    let userPosts = await user_all_posts.findOne({ email: response.email });
    console.log(userPosts);

    if (!userPosts) {
      // If the user document does not exist, create a new one
      userPosts = new user_all_posts({ email: response.email, posts: [] });
    }

    // console.log(userPosts);

    userPosts.posts.push(response);
    const response2 = await userPosts.save();

    console.log("User posts updated:", response2);

    res.status(200).json({ success: true, message: "Post Created" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error });
  }
});

module.exports = router;
