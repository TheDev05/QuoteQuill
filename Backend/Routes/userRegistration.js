const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const database = require("../db");
const form_user_model = require("../Models/form_user_model");

router.post("/", async (req, res) => {
  try {
    console.log(req.body.email);

    const day = new Date();
    req.body.last_login = day.toLocaleString();

    await database();
    const collection = form_user_model;
    const response = await collection.findOne({ email: req.body.email });
    if (response) {
      res.status(400).json({ success: false, message: "user already exist" });
    } else {
      collection.create(req.body);
      res.status(201).json({ success: true, message: "User Registered" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
