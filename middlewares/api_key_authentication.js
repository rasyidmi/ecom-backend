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

module.exports = apiKeyAuth;
