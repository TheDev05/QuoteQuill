const jwt = require("jsonwebtoken");
const secretKey = "alpha123@3412beta";

const validate = (req, res, next) => {
  console.log("middleware accesed");

  // console.log("req", req);
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).send("Unauthorized: No token provided");
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    next();
  } catch (error) {
    console.log(error);
    res.status(403).send("Forbidden: Invalid token");
  }
};

module.exports = validate;
