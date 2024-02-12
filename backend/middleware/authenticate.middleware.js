const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "mannu", (err, decoded) => {
      if (decoded) {
        req.body.userId = decoded.userId;
        console.log(userId)
        next();
      } else {
        res.send({ msg: "Please login first" });
      }
    });
  } else {
    res.send({ msg: "please login first" });
  }
};
module.exports = { authenticate};
