// import express from "express";
// import { Login, Register,logout } from "../controllers/userController.js";


// const router = express.Router();

// router.route("/register").post(Register);
// router.route("/login").post(Login);
// router.route("/logout").get(logout);
// // router.route("/bookmark/:id").put(isAuthenticated, bookmark)
// // router.route("/profile/:id").get(isAuthenticated, getMyProfile);
// // router.route("/otheruser/:id").get(isAuthenticated, getOtherUsers);
// // router.route("/follow/:id").post(isAuthenticated, follow);
// // router.route("/unfollow/:id").post(isAuthenticated, unfollow);

// export default router;

// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();
  
  res.status(201).json({ message: 'User registered successfully!' });
});

// Send Verification Email
router.post('/send-verification', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ error: 'User not found' });

  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  user.verificationCode = verificationCode;
  await user.save();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verification Code',
    text: `Your verification code is ${verificationCode}`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) return res.status(500).json({ error: 'Error sending email' });
    res.status(200).json({ message: 'Verification email sent!' });
  });
});

// Verify User
router.post('/verify', async (req, res) => {
  const { email, verificationCode } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.verificationCode !== verificationCode) {
    return res.status(400).json({ error: 'Invalid verification code' });
  }

  user.isVerified = true;
  user.verificationCode = null; // Clear the code
  await user.save();

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ message: 'User verified successfully!', token });
});

// Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  if (!user.isVerified) {
    return res.status(400).json({ error: 'User not verified. Please check your email.' });
  }

  res.status(200).json({ message: 'Login successful!' });
});

module.exports = router;
