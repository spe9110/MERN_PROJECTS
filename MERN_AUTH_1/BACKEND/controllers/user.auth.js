import userValidationSchema from "../validation/registerUser.js";
import AppError from "../middlewares/AppError.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";
import loginUserValidationSchema from "../validation/loginUser.js";
import { transporter } from "../config/nodemailer.js";
import { EMAIL_TEMPLATE, PASSWORD_RESET_TEMPLATE } from "../config/emailTemplate.js";

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

    // Send welcome email
    const mailOptions = {
      from: {
        name: "Spencer Wawaku",
        address: process.env.EMAIL_SENDER
      }, 
      to: newUser.email,
      subject: "Welcome to MERN Auth",
      // text: `Hello ${newUser.name || ""},\n\nThank you for registering with MERN Auth. Your account has been created successfully.\n\nBest regards,\nMERN Auth Team`,
      html: EMAIL_TEMPLATE,
    }
    
    await transporter.sendMail(mailOptions);

    // Set token in cookies
    res.cookie("AccessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'Strict', // Prevent CSRF attacks
      maxAge: 3600000 // 1 hour
    });
    // Return only name, email and token
    return res.status(201).json({
      success: true,
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


export const login = async (req, res, next) => {
  // Validate request body
  const { error } = loginUserValidationSchema.validate(req.body);
  if (error) {
    return next(new AppError(400, error.details[0].message));
  }

  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return next(new AppError(404, "User not found."));
    }

    // Compare password with stored hash
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return next(new AppError(401, "Invalid email or password."));
    }

    // Create JWT payload
    const payload = { id: user._id, email: user.email };
    const secret = process.env.JWT_SECRET;
    if (!secret) return next(new AppError(500, "JWT_SECRET is not defined"));

    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    // Set token in cookies
    res.cookie("AccessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'Strict',
      maxAge: 3600000 // 1 hour
    });

    // Return success response
    return res.status(200).json({
      success: true,
      message: "User login successfully",
      user: {
        name: user.name,
        email: user.email
      },
      token
    });

  } catch (error) {
    next(error);
  }
};


export const logout = async (req, res, next) => {
  try {
    // Clear the cookie
    res.clearCookie("AccessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'Strict'
    });

    return res.status(200).json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    next(error);
  }
}

// send verification OTP to the user's email
export const sendOtpVerificationEmail = async (req, res, next) => {
  try {
    const userId = req.user; // Assuming user is set in the request by an authentication middleware

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError(404, "User not found."));
    }

    if (user.isAccountVerified) {
      return next(new AppError(400, "Account is already verified."));
    }

    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save the OTP and expiration time to the user's document
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    await user.save();

    // Send the OTP to the user's email
    const mailOptions = {
      from: {
        name: "Spencer Wawaku",
        address: process.env.EMAIL_SENDER
      },
      to: user.email,
      subject: "Email Verification OTP",
      // text: `Hello ${user.name || ""},\n\nYour OTP for email verification is: ${otp}\n\nPlease use this OTP to verify your email address.\n\nBest regards,\nMERN Auth Team`,
      html: EMAIL_TEMPLATE
        .replace("{{otp}}", otp)
        .replace("{{email}}", user.email)
        .replace("{{name}}", user.name)
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: "Verification email sent successfully." });

  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { otp } = req.body;

    if (!otp) {
      return next(new AppError(400, "OTP is required."));
    }

    const userId = req.user; // Assuming user is set in the request by an authentication middleware
    const user = await User.findById(userId);

    if (!user) {
      return next(new AppError(404, "User not found."));
    }
    
    // Check if OTP is correct
    if (!user.verifyOtp || user.verifyOtp !== otp) {
      return next(new AppError(400, "Invalid OTP."));
    }

    // Check if OTP has expired
    if (!user.verifyOtpExpireAt || user.verifyOtpExpireAt < Date.now()) {
      return next(new AppError(400, "OTP has expired."));
    }

    // Mark the account as verified
    user.isAccountVerified = true;
    user.verifyOtp = ""; // Clear the OTP after verification
    user.verifyOtpExpireAt = 0; // Clear the expiration time
    
    await user.save();

    return res.status(200).json({ success: true, message: "Email verified successfully." });

  } catch (error) {
    next(error);
  }
}

export const isAuthenticated = (req, res, next) => {
  try {
    return res.status(200).json({ success: true, message: "User is authenticated", userId: req.user });
  } catch (error) {
    next(error);
  }
}

// send Password Reset OTP to the user's email
export const PasswordResetEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return next(new AppError(400, "Email is required."));
    }
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return next(new AppError(404, "User not found."));
    }
    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save the OTP and expiration time to the user's document
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000; // 15 minutes

    await user.save();

    // Send the OTP to the user's email
    const mailOptions = {
      from: {
        name: "Spencer Wawaku",
        address: process.env.EMAIL_SENDER
      },
      to: user.email,
      subject: "Password Reset OTP",
      // text: `Hello ${user.name || ""},\n\nYour OTP for password reset is: ${otp}\n\nPlease use this OTP to reset your password.\n\nBest regards,\nMERN Auth Team`,
      html: PASSWORD_RESET_TEMPLATE
        .replace("{{otp}}", otp)
        .replace("{{email}}", user.email)
        .replace("{{name}}", user.name)
    };
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: "OTP was sent to your email address." });
  } catch (error) {
    next(error);
  }
}

export const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return next(new AppError(400, "Email, OTP, and new password are required."));
    }
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return next(new AppError(404, "User not found."));
    }
    // Check if OTP is correct
    if (!user.resetOtp || user.resetOtp !== otp) {
      return next(new AppError(400, "Invalid OTP."));
    }
    // Check if OTP has expired
    if (!user.resetOtpExpireAt || user.resetOtpExpireAt < Date.now()) {
      return next(new AppError(400, "OTP has expired."));
    }
    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Update the user's password
    user.password = hashedPassword;
    user.resetOtp = ""; // Clear the OTP after reset
    user.resetOtpExpireAt = 0; // Clear the expiration time

    await user.save();
    return res.status(200).json({ success: true, message: "Password reset successfully." });
    
  } catch (error) {
    next(error);
  }
}
