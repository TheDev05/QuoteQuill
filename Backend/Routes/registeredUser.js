const express = require("express");
const router = express.Router();

const form_user_model = require("../Models/form_user_model");
const database = require("../db");

router.get("/", async (req, res) => {
  try {
    await database();
    const collection = form_user_model;
    const data = await collection.find();

    // console.log("data", data);
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    // console.log(error);
    res.status(400).json({ success: false, message: error });
  }
});

module.exports = router;
