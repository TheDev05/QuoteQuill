const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // console.log(req.body.email);
    if (req.body.email == "admin@email.com" && req.body.password == "23123") {
      res.status(200).json({ success: true, message: "Admin login succesful" });
    } else {
      res.status(400).json({ success: false, message: "Incorrect Password" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
