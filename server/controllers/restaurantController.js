// server/controllers/restaurantController.js
import Restaurant from '../models/Restaurant.js';

// @desc    Get all restaurants (with optional filters)
// @route   GET /api/restaurants
export const getAllRestaurants = async (req, res) => {
  try {
    const { cuisine, priceRange, location } = req.query;

    let filter = {};
    if (cuisine) filter.cuisine = { $regex: cuisine, $options: 'i' };
    if (priceRange) filter.priceRange = priceRange;
    if (location) filter.location = { $regex: location, $options: 'i' };

    const restaurants = await Restaurant.find(filter);
    res.status(200).json(restaurants);
  } catch (err) {
    console.error('Error fetching restaurants:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @desc    Get single restaurant by ID
// @route   GET /api/restaurants/:id
export const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });

    res.status(200).json(restaurant);
  } catch (err) {
    console.error('Error fetching restaurant by ID:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @desc    Seed 30 Jaipur restaurants (only once)
// @route   POST /api/restaurants/seed
import fs from 'fs';
import path from 'path';

export const seedRestaurants = async (req, res) => {
  try {
    const filePath = path.resolve('server/jaipur_restaurants.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    await Restaurant.deleteMany(); // Clear existing data
    const inserted = await Restaurant.insertMany(data);

    res.status(201).json({ message: 'Seeded successfully', count: inserted.length });
  } catch (err) {
    console.error('Error seeding restaurants:', err.message);
    res.status(500).json({ message: 'Failed to seed restaurants' });
  }
};
