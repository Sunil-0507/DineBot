// server/routes/restaurantRoutes.js

import express from 'express';
import {
  getAllRestaurants,
  getRestaurantById,
  searchRestaurants
} from '../controllers/restaurantController.js';

const router = express.Router();

// Get all restaurants
router.get('/', getAllRestaurants);

// Get single restaurant by ID
router.get('/:id', getRestaurantById);

// Search restaurants by query (cuisine, location, priceRange)
router.get('/search/query', searchRestaurants);

export default router;
