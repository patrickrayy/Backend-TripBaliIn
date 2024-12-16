import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const register = async (req, res) => {
    try {
        const { name, email, password, location, tanggal_lahir, phone } = req.body;

        if (!name || !email || !password || !tanggal_lahir || !phone) {
            return res.status(400).json({
                status: 'error',
                message: 'All fields are required'
            });
        }

        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'Email already registered'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userId = await User.create({
            name,
            email,
            role: 'user',
            password: hashedPassword, 
            location, 
            tanggal_lahir,
            phone
        });
        res.status(201).json({
            status: 'success',
            message: 'Registration successful',
            data: { userId }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Email and password are required'
            });
        }

        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid credentials'
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            status: 'success',
            data: {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    tanggal_lahir: user.tanggal_lahir,
                    location : user.location
                }
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        res.json({
            status: 'success',
            data: user
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { name, email, tanggal_lahir, phone, location } = req.body;

        if (!name || !email || !tanggal_lahir|| !location || !phone) {
            return res.status(400).json({
                status: 'error',
                message: 'All fields are required'
            });
        }

        if (email !== req.user.email) {
            const existingUser = await User.findByEmail(email);
            if (existingUser && existingUser.id !== req.user.id) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Email is already in use'
                });
            }
        }

        const updated = await User.updateProfile(req.user.id, {
            name,
            email,
            tanggal_lahir,
            location,
            phone
        });

        if (!updated) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        res.json({
            status: 'success',
            message: 'Profile updated successfully',
            data: {
                name,
                email,
                tanggal_lahir,
                location,
                phone
            }
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};