export const EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Welcome Email</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f6f9fc;
      font-family: Arial, sans-serif;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 0 10px rgba(0,0,0,0.05);
    }
    .header {
      background-color: #4f46e5;
      padding: 30px;
      text-align: center;
    }
    .header img {
      height: 60px;
      margin-bottom: 10px;
    }
    .header h1 {
      color: #ffffff;
      font-size: 24px;
      margin: 0;
    }
    .content {
      padding: 30px;
      color: #333333;
    }
    .content h2 {
      font-size: 20px;
      margin-bottom: 10px;
    }
    .otp-box {
      background-color: #f0f0f5;
      padding: 15px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      color: #4f46e5;
      border-radius: 6px;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      padding: 20px;
      font-size: 12px;
      color: #888888;
      background-color: #fafafa;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://yourdomain.com/logo.png" alt="Your Logo" />
      <h1>Welcome to YourApp</h1>
    </div>
    <div class="content">
      <h2>Hello {{name}},</h2>
      <p>Thank you for signing up with <strong>YourApp</strong>!</p>
      <p>To complete your registration, please use the verification code below:</p>
      <div class="otp-box">{{otp}}</div>
      <p>This code is valid for 24 hours. Please do not share it with anyone.</p>
      <p>If you did not create an account with <strong>{{email}}</strong>, please ignore this message.</p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} YourApp. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Password Reset</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f6f9fc;
      font-family: Arial, sans-serif;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 0 10px rgba(0,0,0,0.05);
    }
    .header {
      background-color: #dc2626;
      padding: 30px;
      text-align: center;
    }
    .header img {
      height: 60px;
      margin-bottom: 10px;
    }
    .header h1 {
      color: #ffffff;
      font-size: 24px;
      margin: 0;
    }
    .content {
      padding: 30px;
      color: #333333;
    }
    .content h2 {
      font-size: 20px;
      margin-bottom: 10px;
    }
    .otp-box {
      background-color: #fef2f2;
      padding: 15px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      color: #dc2626;
      border-radius: 6px;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      padding: 20px;
      font-size: 12px;
      color: #888888;
      background-color: #fafafa;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://yourdomain.com/logo.png" alt="Your Logo" />
      <h1>Password Reset Request</h1>
    </div>
    <div class="content">
      <h2>Hello {{name}},</h2>
      <p>We received a request to reset your password for the account <strong>{{email}}</strong>.</p>
      <p>Please use the OTP below to reset your password:</p>
      <div class="otp-box">{{otp}}</div>
      <p>This OTP is valid for 15 minutes. If you didn't request a password reset, please ignore this email.</p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} YourApp. All rights reserved.
    </div>
  </div>
</body>
</html>
`;
