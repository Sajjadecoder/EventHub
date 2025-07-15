import { verifyAccessToken } from "../utils/jwt.js" // adjust path if needed

const isLoggedIn = (req, res, next) => {
    console.log("inside isLoggedIn")
    const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyAccessToken(token); // using your helper
    req.user = decoded; // store decoded user info for later use
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

export {isLoggedIn};
