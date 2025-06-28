import { asyncHandler } from "../utils/asyncHandler.js";

import { verifyRefreshToken } from '../utils/jwt.js';
import bcrypt from 'bcrypt'
import { pool } from '../db/connectDB.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt)
    const result = await pool.query('INSERT INTO users(name,email,password,role) VALUES ($1,$2,$3,$4) RETURNING id,name,email,role', [name, email, hashedPassword, role])
    const newUser = result.rows[0];

    console.log('✅ Registered new user:', newUser);

    res.status(201).json({
        message: 'User registered successfully',
        user: newUser
    });


})

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Get user from DB
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false, // set to true if using HTTPS
        sameSite: 'Lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    // localStorage.setItem("user", JSON.stringify(userRes.data.user))

    res.json({
        accessToken, user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
};

const logoutUser = async (req, res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: false, // set to true in production with HTTPS
    sameSite: 'Lax',
  });

  return res.status(200).json({ message: 'Logged out successfully' });
};

const refreshAccessToken = async (req, res) => {
    const token = req.cookies.refreshToken;

    if (!token) return res.status(401).json({ message: 'No refresh token found' });

    try {
        const decoded = verifyRefreshToken(token);
        const accessToken = generateAccessToken(decoded);
        res.json({ accessToken });
    } catch (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }
};
const getCurrentUser = async (req, res) => {
    const authHeader = req.headers.authorization;

    // Check if token is present
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        // Verify access token
        const decoded = verifyAccessToken(token); // this should return decoded user info (e.g., { id, email })

        // Get user from DB
        const result = await pool.query(
            "SELECT id, name, email, role FROM users WHERE id = $1",
            [decoded.id]
        );

        const user = result.rows[0];
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error("Error verifying token:", error);
        res.status(403).json({ message: "Invalid or expired token" });
    }
};

export { registerUser, loginUser, logoutUser, refreshAccessToken, getCurrentUser }