const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const secretKey = "alpha123@3412beta";

const database = require("../db");
const form_user_model = require("../Models/form_user_model");

router.post("/", async (req, res) => {
  try {
    // console.log(req.body.email);
    // console.log("logining..");
    await database();
    const collection = form_user_model;
    const response = await collection.findOne({ email: req.body.email });
    if (response == null) {
      res.status(400).json({ success: false, message: "user doesn't exist" });
    }

    bcrypt.compare(req.body.password, response.password, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }

      if (result) {
        // console.log("Password Matched!");
        const token = jwt.sign(req.body.email, secretKey);
        // console.log("token", token);
        res
          .cookie("authToken", token)
          .status(200)
          .json({ success: true, message: "User Login Succesful" });
      } else {
        res.status(401).json({ success: false, message: "Incorrect Password" });
      }
    });
  } catch (error) {
    // console.log(error);
  }
});

module.exports = router;
