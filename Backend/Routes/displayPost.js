const express = require("express");
const router = express.Router();

const database = require("../db");
const post_model = require("../Models/post");

router.get("/", async (req, res) => {
  try {
    await database();
    const collection = post_model;
    const response = await collection.find();
    // console.log("all post sent");
    // console.log(response);

    res.status(200).json({ data: response });

    // res.status(200).json({ success: true, message: "Post Created" });
  } catch (error) {
    console.log(error);
    // res.status(400).json({ success: false, message: error });
  }
});

module.exports = router;
