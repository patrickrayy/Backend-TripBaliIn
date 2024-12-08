import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const getProfile = async (req, res) => {
    try{
        const userId = req.user._id;

        const user = await User.findById(req.user._id);

        if (!user) return res.status(404).json({message:'User not found'});

        res.json({
            name: user.name,
            email: user.email,
            phone: user.phone,
            location: user.location,
            tanggal_lahir: user.tanggal_lahir,
            // password: user.password
        });
    }catch (error){
        res.status(500).json({message: 'Error fetching user profile'});
    }
};

export const updateProfile = async (req,res) => {
    const { name, email, phone, location, tanggal_lahir, password} = req.body;
    try{
        const userId = req.user._id;
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser._id !== userId){
            return res.status(400).json({message: 'Email already exists'});
        }
        let hashedPassword = password;
        if(password) {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
        }
        const user = await User.findByIdAndUpdate(userId,{
            name,
            email,
            phone,
            location,
            tanggal_lahir,
            password: hashedPassword,
        }, { new: true });

        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        res.json({
            message: 'Profile updated successfully',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                location: user.location,
                tanggal_lahir: user.tanggal_lahir,
            }
        })
    } catch(eror){
        res.status(500).json({message: 'Error updating user profile'});
    }
}