import jwt from 'jsonwebtoken';
import  User  from '../models/user.js';

const JWT_SECRET = process.env.JWT_SECRET

const verifyToken = async (req, res, next) => {
  // const user = await User.findOne({ where: { name: 'Raymond Patrick' } });
  // res.json(user);
  const authHeader = req.headers.authorization;

  const authToken = authHeader && authHeader.split(" ")[1];
  if (!authToken) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify token
    const user = await User.findById(decoded.id); // Fetch user from database
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user); // Send user data to the client
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
  };

//   const isAdmin = (req, res, next) => {
//     if (req.user?.role !== 'admin') {
//       return res.status(403).json({ message: 'Access denied' });
//     }
//     next();
//   };

export default verifyToken;