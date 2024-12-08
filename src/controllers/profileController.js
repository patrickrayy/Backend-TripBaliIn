import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export const getProfile = async (req, res) => {
    try{
        const userId = req.user._id;

        const user = await User.findById(req.user._id);

        if (!user) return res.status(404).json({message:'User not found'});

        res.json({
            name: user.name,
            email: user.email,
            phone: user.phone,
            tanggal_lahir: user.tanggal_lahir,
            password: user.password
        });
    }catch (error){
        res.status(500).json({message: 'Error fetching user profile'});
    }
};

export const updateProfile = async (req,res) => {
    const { name, email, phone, tanggal_lahir } = req.body;
    try{
        const userId = req.user._id;
        const user = await User.findByIdAndUpdate(userId,{
            name,
            email,
            phone,
            tanggal_lahir,
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
                tanggal_lahir: user.tanggal_lahir,
                password: user.password
            }
        })
    } catch(eror){
        res.status(500).json({message: 'Error updating user profile'});
    }
}