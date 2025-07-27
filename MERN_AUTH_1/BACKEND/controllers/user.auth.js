import userValidationSchema from "../validation/registerUser.js";
import AppError from "../middlewares/AppError.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";

export const createUser = async (req, res, next) => {
  // Validate request body
  const { error } = userValidationSchema.validate(req.body);
  if (error) {
    return next(new AppError(400, error.details[0].message));
  }

  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return next(new AppError(409, "User already exists."));
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // Create JWT payload
    const payload = { id: newUser._id, email: newUser.email };

    const secret = process.env.JWT_SECRET;
    if (!secret) return next(new AppError(500, "JWT_SECRET is not defined"));

    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    // Return only name, email and token
    return res.status(201).json({
      message: "User created successfully",
      user: {
        name: newUser.name,
        email: newUser.email
      },
      token
    });

  } catch (error) {
    next(error);
  }
};
