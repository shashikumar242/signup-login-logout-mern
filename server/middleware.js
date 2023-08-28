const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const token = req.header("x-token");


    if (!token) {
      return res.status(500).send("Token is required");
    }

    const decode = jwt.verify(token, "jwtSecure");


    // this is how decode.user looks like
    //   let payload = {
    //       user: {
    //           id: id
    //       }
    //   }

    req.user = decode.user;

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send("Invalid token");
  }
};
