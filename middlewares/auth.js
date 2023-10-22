const { verifyToken } = require("../services/jwt");

const apiKeyAuth = async (req, res, next) => {
  try {
    const apiKey = req.header("api_key");
    if (!apiKey || apiKey != process.env.API_KEY)
      return res.status(401).json({ message: "Wrong api key." });
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const loginAuth = async (req) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return;
    }
    if (!authHeader.startsWith("Bearer ")) {
      return;
    }
    const payload = tokenExtraction(authHeader);
    if (!payload) return;
    return { user: { _id: payload._id, email: payload.email } };
  } catch (error) {
    return;
  }
};

function tokenExtraction(bearerToken) {
  const token = bearerToken.substring(7, bearerToken.length);
  const payload = verifyToken(token);
  return payload;
}

exports.apiKeyAuth = apiKeyAuth;
exports.loginAauth = loginAuth;
