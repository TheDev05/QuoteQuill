const express = require("express");
const router = express.Router();

const database = require("../db");
const post_model = require("../Models/post");

router.post("/", async (req, res) => {
  try {
    const day = new Date();
    req.body.date = `${day.getDate()}-${day.getMonth()}-${day.getFullYear()}`;

    await database();
    const collection = post_model;
    const response = await collection.create(req.body);
    res.status(200).json({ success: true, message: "Post Created" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error });
  }
});

module.exports = router;
