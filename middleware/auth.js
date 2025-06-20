module.exports = (req, res, next) => {
  const apiKey = req.headers["api-key"];
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(403).json({ message: "Unauthorized access" });
  }
  next();
};
