const express = require("express");
const router = express.Router();

const post_model = require("../Models/post");
const database = require("../db");

const user_model = require("../Models/form_user_model");

router.post("/", async (req, res) => {
  try {
    await database();

    console.log("id", req.body);
    const collection = post_model;
    const post = await collection.findById(req.body.id);

    let ok = false;
    if (post.isLiked) {
      post.likeCount = Math.max(post.likeCount - 1, 0);
    } else {
      ok = true;
      post.likeCount += 1;
    }

    post.isLiked = !post.isLiked;

    // Save the updated post
    const response = await post.save();
    // console.log(response);

    let temp = -1;
    if (ok) {
      temp = 1;
    }

    const userResponse = await user_model.findOneAndUpdate(
      { email: req.body.email },
      { $inc: { likeCount: temp } },
      { new: true }
    );

    // console.log("userResponse", userResponse);

    // console.log("like", response);
    res.status(200).json({ success: true, message: response.likeCount });

    // res.status(200).json({ success: true, message: "Post Created" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error });
  }
});

module.exports = router;
