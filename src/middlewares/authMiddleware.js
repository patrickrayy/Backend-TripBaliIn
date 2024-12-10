import jwt from 'jsonwebtoken';
import  User  from '../models/user.js';

const JWT_SECRET = process.env.JWT_SECRET

const verifyToken = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
    
        if (!authorization) {
          return res.status(401).json({
            status: "Failed",
            message: "Token is missing !",
            isSuccess: true,
            data: null,
          });
        }
    
        const token = authorization.split("Bearer ")[1];
        const payload = jwt.verify(token, JWT_SECRET);
        const user = await User.findByPk(payload.userId);
    
        req.user = user;
        next();
      } catch (error) {
        return res.status(500).json({
          status: "Failed",
          message: "You are unauthorized.",
          isSuccess: true,
          data: null,
        });
      }
  };

//   const isAdmin = (req, res, next) => {
//     if (req.user?.role !== 'admin') {
//       return res.status(403).json({ message: 'Access denied' });
//     }
//     next();
//   };

export default verifyToken;