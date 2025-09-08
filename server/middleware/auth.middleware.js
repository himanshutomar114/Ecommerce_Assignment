// middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protectRoute = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token && req.cookies?.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized – No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded?.userId) {
      return res.status(401).json({ message: "Unauthorized – Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized – User not found" });
    }

    req.user = user; // attach user object (with role) to request
    next();
  } catch (error) {
    console.error("JWT protectRoute error:", error.message);
    return res.status(401).json({ message: "Unauthorized – Token error" });
  }
};

// 🔹 New middleware: only allow admins
export const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden – Admins only" });
  }
  next();
};
