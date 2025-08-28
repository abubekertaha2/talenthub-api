import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findByEmail, createUser } from '../models/userModel.js';

// The secret key for signing JWTs, from my .env file
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Handles user registration.
 * Hashes password and creates a new user in the database.
 */
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    // Check if user already exists
    const existingUser = await findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'User with that email already exists.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user in the database
    const newUserId = await createUser({ name, email, password: hashedPassword, role });

    // Generate JWT token
    const token = jwt.sign({ id: newUserId, role }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully!', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Handles user login.
 * Verifies password and returns a JWT token.
 */
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Logged in successfully!', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};