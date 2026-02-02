import { authenticateRequest } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    const auth = authenticateRequest(req);

    if (!auth?.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findOne({ clerkId: auth.userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("protectRoute error:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
