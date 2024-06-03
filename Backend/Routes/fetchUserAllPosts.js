const express = require("express");
const router = express.Router();

const user_all_posts = require("../Models/user-all-posts");
const database = require("../db");

router.post("/", async (req, res) => {
  try {
    await database();
    const collection = user_all_posts;
    const response = await collection.find({ email: req.body.email });
    // console.log("user_data", response);

    res.status(200).json({ data: response });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
