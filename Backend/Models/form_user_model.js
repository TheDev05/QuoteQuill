const mongoose = require("mongoose");

const form_user_schema = mongoose.Schema({
  email: { type: String },
  password: { type: String },
  fname: { type: String },
  lname: { type: String },
  last_login: { type: String },
  status: { type: String, default: "active" },
  likeCount: { type: Number },
  bio: { type: String, default: "" },
  address: { type: String, default: "" },
  city: { type: String, default: "" },
  state: { type: String, default: "" },
  zip: { type: String, default: "" },
});

const form_user_model = mongoose.model("form-user-data", form_user_schema);
module.exports = form_user_model;
