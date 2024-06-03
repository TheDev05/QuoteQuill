const express = require("express");
const router = express.Router();

const user_all_posts = require("../Models/user-all-posts");
const database = require("../db");

const post_model = require("../Models/post");

router.post("/", async (req, res) => {
  try {
    console.log("remove posts", req.body);

    await database();
    const collection = user_all_posts;
    const response = await collection.findOne({ email: req.body.email });

    const updatedResponse = response.posts.filter(
      (post) => post._id.toString() !== req.body.id
    );

    // // Update the user's posts array with the filtered array
    response.posts = updatedResponse;

    console.log(updatedResponse);

    // // Save the updated user document(whole)
    await response.save();

    const postCollection = post_model;
    const postResponse = await postCollection.findByIdAndDelete(req.body.id);
    console.log("deleted", postResponse);

    res.status(200).json({ success: true, message: "Post Deleted" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
