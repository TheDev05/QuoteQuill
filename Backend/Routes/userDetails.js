const express = require("express");
const router = express.Router();

const form_user_model = require("../Models/form_user_model");
const database = require("../db");

router.post("/fetch", async (req, res) => {
  try {
    await database();
    const collection = form_user_model;
    const data = await collection.findOne({ email: req.body.email });

    // console.log("data", data);
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    // console.log(error);
    res.status(400).json({ success: false, message: error });
  }
});

router.post("/update", async (req, res) => {
  try {
    await database();
    const collection = form_user_model;
    const response = await collection.updateOne(
      { email: req.body.email },
      { $set: req.body }
    );

    console.log("data", response);
    res
      .status(200)
      .json({ success: true, data: req.body, message: "Update Succesfully" });
  } catch (error) {
    // console.log(error);
    res.status(400).json({ success: false, message: error });
  }
});

module.exports = router;
