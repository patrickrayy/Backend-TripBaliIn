import express from 'express';
import { getAccommodationById, getAllAccommodations } from '../controllers/accommodationController.js';

const router = express.Router();

router.get('/aco', getAllAccommodations);
router.get('/aco/:id', getAccommodationById);


export default router;