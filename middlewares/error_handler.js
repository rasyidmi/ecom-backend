const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case "AuthError":
      return res.status(400).json({
        message: err.message,
        request: { type: req.method, url: req.originalUrl },
      });
    case "JsonWebTokenError":
      return res.status(401).json({
        message: "Invalid token.",
        request: { type: req.method, url: req.originalUrl },
      });
    case "TokenExpiredError":
      return res.status(401).json({
        message: "Token expired.",
        request: { type: req.method, url: req.originalUrl },
      });
    default:
      console.log(`ERROR: ${err}`);
      return res.status(500).json({
        message: "Internal Server Error",
        request: { type: req.method, url: req.originalUrl },
      });
  }
};

exports.errorHandler = errorHandler;
