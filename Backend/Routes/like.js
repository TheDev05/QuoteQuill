const express = require("express");
const router = express.Router();

const post_model = require("../Models/post");
const database = require("../db");

router.post("/", async (req, res) => {
  try {
    await database();
    // console.log("id", req.body);
    const collection = post_model;
    const response = await collection.updateOne(
      { _id: req.body.id },
      { $set: { isLiked: !req.body.postIsLiked } }
    );

    // console.log("like", response);
    res.status(200).json({ success: true, message: "Liked" });

    // res.status(200).json({ success: true, message: "Post Created" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error });
  }
});

module.exports = router;
