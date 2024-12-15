import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './src/routes/authRoutes.js';
import profileRoutes from './src/routes/profileRoutes.js';

dotenv.config();

const corsOptions ={
  origin:process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}

const app = express();

app.use(cors(corsOptions));           
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.options('*', cors(corsOptions));

app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "OK",
  });
});

app.use('/api/auth',authRoutes);
app.use('/api/profile',profileRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
