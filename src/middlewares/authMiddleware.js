import jwt from 'jsonwebtoken';
import  User  from '../models/user.js';

const protect = async (req, res, next) =>{
    const token = req.header('Authorization')?.replace('Bearer','  ')[1];

    if (!token){
        return res.status(401).json({message: 'Auth token missing'});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = await User.findById(decoded._id);
        
        if(!req.user){
            return res.status(401).json({message: 'User not found'});
        }

        next();
    }catch (error){
        return res.status(400).json({message: 'Invalid token or expired'});
    }
};

export default protect;