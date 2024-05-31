const express = require("express");
const router = express.Router();

const database = require("../db");
const post_model = require("../Models/post");

router.post("/", async (req, res) => {
  try {
    const day = new Date();
    req.body.date = `${day.getDate()}-${day.getMonth()}-${day.getFullYear()}`;

    const temp = {
      title: "Sample Title",
      message: "Sample Message",
      date: "31-4-2024",
      isLiked: false,
      first_name: "Hardcoded Name",
      email: "aa@aa.com",
    };

    await database();
    const collection = post_model;
    const response = await collection.create(temp);
    res.status(200).json({ success: true, message: "Post Created" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error });
  }
});

module.exports = router;
