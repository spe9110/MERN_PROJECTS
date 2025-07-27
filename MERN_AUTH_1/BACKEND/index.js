import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from "body-parser";
import helmet from 'helmet';
import morgan from "morgan";
import authRoutes from './routes/user.auth.js';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';


import errorHandler from './middlewares/ErrorHandler.js';


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
// Global rate limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

// Middlewares
// Parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());

// Enable cors
app.use(cors());
// Middleware for parsing cookies
app.use(cookieParser());
app.use(globalLimiter); // Correctly applies to all requests

// Routes
app.use('/api/v1/users/auth', authRoutes);

// Define a route for GET requests to the root URL
app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});

// 404 route handler
// app.get('*', (req, res, next) => {
//     next(new AppError(404, `Page not Found`));
// });

// 5. Error handler (always last)
app.use(errorHandler);

// Start the server and connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("You're connected successfully to the database");
        
        app.listen(PORT, () => {
          console.log(`Server running on port:${PORT}`);
        })
    })
    .catch((error) => {
        console.log("Database connection failed", error.message);
        process.exit(1); // Exit process with failure
    })


// npm install express bcrypt dotenv nodemon cookie-parser jsonwebtoken cors
// npm install --save-dev mongoose
// npm install nodemailer
// npm install joi
// npm install body-parser
// npm install helmet morgan
// npm install express-session
// npm i express-rate-limit