import jwt from 'jsonwebtoken';

const protect = (req, res, next) =>{
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token){
        return res.status(401).json({message: 'Auth token missing'});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId;
        next();
    }catch (error){
        return res.status(400).json({message: 'Invalid token'});
    }
};

export default protect;