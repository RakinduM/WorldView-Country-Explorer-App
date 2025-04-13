import express from 'express';
import { protect } from '../middlewares/AuthMiddleware.js';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/UserController.js';

const router = express.Router();

router.use(protect);

router.get('/favorites', getFavorites);
router.post('/favorites', addFavorite);
router.delete('/favorites/:countryCode', removeFavorite);

export default router;