import redis from "../../shared/redis/redis.js";

const authMiddleware = async (req, res, next) => {
  try {
    const sessionId = req.cookies?.session;

    if (!sessionId) {
      return res.status(400).json({ message: "unauthorized" });
    }

    const userData = await redis.get(`sessionId:${sessionId}`);

    if (!userData) {
      return res.status(400).json({ message: "session expired" });
    }

    req.user = JSON.parse(userData);
    next();
  } catch (error) {
    return res.status(500).json({ message: `protect error ${error}` });
  }
};

export default authMiddleware;
