import express from 'express';
import rateLimit from 'express-rate-limit';
import { createUser, login, logout, sendOtpVerificationEmail, verifyEmail } from '../controllers/user.auth.js';
import { userAuth } from '../middlewares/userAuth.js';


const router = express.Router();

// Configure rate limiting
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 attempts per window
    message: 'Too many login attempts, please try again later'
});

// @desc This route is for create a user 
// @endpoint /create
// @public 
router.post('/create', createUser);

// @desc This route is for create a user 
// @endpoint /create
// @public 
router.post('/login', loginLimiter, login);

// @desc This route is for create a user 
// @endpoint /create
// @public 
router.post('/logout', logout);

// @desc This route is for sending OTP verification email
// @endpoint /send-otp-verification-email
// @private
router.post('/send-otp-verify', userAuth, sendOtpVerificationEmail);

// @desc This route is for verifying the user's email with OTP
// @endpoint /verify-email
router.post('/verify-email', userAuth, verifyEmail);


export default router;