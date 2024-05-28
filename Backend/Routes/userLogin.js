const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const secretKey = "alpha123@3412beta";

const database = require("../db");
const form_user_model = require("../Models/form_user_model");

router.post("/", async (req, res) => {
  try {
    // console.log(req.body.email);
    console.log("logining..");
    await database();
    const collection = form_user_model;
    const response = await collection.findOne({ email: req.body.email });
    if (response == null) {
      res.status(400).json({ success: false, message: "user doesn't exist" });
    }

    if (response.password != req.body.password) {
      res.status(401).json({ success: false, message: "Incorrect Password" });
    }

    const token = jwt.sign(req.body.email, secretKey);
    console.log("token", token);
    res
      .cookie("authToken", token)
      .status(200)
      .json({ success: true, message: "User Login Succesful" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
