import jwt from 'jsonwebtoken';
import User from '../models/user.js';  
import bcrypt from 'bcryptjs'

// Register function
export const registerUser = async (req, res) => {
  const { name, email, role, location, password, phone, tanggal_lahir } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      name,
      email,
      role: role || 'user',
      location,
      password: hashedPassword,
      phone,
      tanggal_lahir,
    });

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send response with token
    res.status(201).json({ token });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Error during registration' });
  }
};

// Login function
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send response with token
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};
