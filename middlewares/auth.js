const { verifyToken } = require("../services/jwt");

const apiKeyAuth = async (req, res, next) => {
  try {
    const apiKey = req.header("api_key");
    if (!apiKey || apiKey != process.env.API_KEY)
      return res.status(401).json({ message: "Wrong api key." });
    next();
  } catch (error) {
    next(error);
  }
};

const loginAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No Token" });
    }
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    const payload = tokenExtraction(authHeader);
    if (!payload) return res.status(401).json({ message: "Invalid Token" });
    req.user = { email: payload.email, id: payload.id };
    next();
  } catch (error) {
    next(error);
  }
};

function tokenExtraction(bearerToken) {
  const token = bearerToken.substring(7, bearerToken.length);
  const payload = verifyToken(token);
  return payload;
}

exports.apiKeyAuth = apiKeyAuth;
exports.loginAauth = loginAuth;
