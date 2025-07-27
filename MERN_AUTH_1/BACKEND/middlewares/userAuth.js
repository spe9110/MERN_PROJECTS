import jwt from 'jsonwebtoken';
import AppError from "../middlewares/AppError.js";

export const userAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Get token from either cookies or Authorization header
  const token =
    req.cookies?.AccessToken ||
    (authHeader && authHeader.startsWith('Bearer ') && authHeader.split(' ')[1]);

  if (!token) {
    return next(new AppError(401, "Access denied. No token provided."));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      return next(new AppError(401, "Invalid token. Not authorized!"));
    }

    req.user = decoded.id; // Attach user ID to request object
    return next(); // Proceed to the next middleware or route handler

  } catch (error) {
    return next(new AppError(403, "Invalid or expired token."));
  }
};
