const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  let token;
  const authHeader = req.headers.Authoriation || req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Login first" });
  }
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401);
      throw new Error("Access Denied");
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        res.status(403);
        throw new Error("Invalid Token");
      } else {
        req.user = user;
        next();
      }
    });
  }
};

module.exports = validateToken;
// In the above code snippet, we have created a middleware function called validateToken that checks if the request contains a valid access token in the Authorization header. If the token is valid, it decodes the token and attaches the user object to the request object. Otherwise, it returns an error response.
