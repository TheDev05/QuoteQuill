const express = require("express");
const router = express.Router();

const database = require("../db");
const form_user_model = require("../Models/form_user_model");

router.delete("/", async (req, res) => {
  try {
    console.log("delete", req.body);

    await database();
    const collection = form_user_model;
    const response = await collection.deleteOne({ _id: req.body.id });
    console.log(response);
    res.status(200).json({ success: true, message: "User removed" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
