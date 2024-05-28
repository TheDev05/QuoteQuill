const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const validate = require("./Middlewares/auth");

app.use(cookieParser());
app.use(express.json());

// CORS
app.use( 
  cors({
    origin: ["https://qq-delta-nine.vercel.app"],
    // origin: ["http://127.0.0.1:5500"],
    methods: ["POST", "GET", "UPDATE", "DELETE"],
    credentials: true,
  })
);

// app.use(validate);

app.use("/guest-register", require("./Routes/userRegistration"));
app.use("/guest-login", require("./Routes/userLogin"));
app.use("/admin-login", require("./Routes/adminLogin"));
app.use("/data", require("./Routes/registeredUser"));
app.use("/remove-user", require("./Routes/removeUser"));
app.use("/post", require("./Routes/post"));
app.use("/displayPost", require("./Routes/displayPost"));
app.use("/like", validate, require("./Routes/like"));

app.get("/testing", (req, res) => {
  res.send("Server Running at 3000 Port");
});

app.listen(3000, () => {
  console.log("Server is Running at port 3000");
});
