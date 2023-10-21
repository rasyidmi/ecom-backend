const jwt = require("jsonwebtoken");

exports.signJwt = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: "1h",
  });
  return token;
};

exports.verifyToken = (token) => {
  const verified = jwt.verify(token, process.env.JWT_KEY);
  return verified;
};
