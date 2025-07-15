import express from 'express';
import {
  createOrder,
  getOrderStatus,
  updateOrderStatus,
  getUserOrders
} from '../controllers/orderController.js';

const router = express.Router();

// Create a new order
router.post('/', createOrder);

// Get all orders for a user (by session or user ID)
router.get('/user/:userId', getUserOrders);

// Get the status of a specific order
router.get('/:orderId/status', getOrderStatus);

// Update the status of an existing order
router.put('/:orderId/status', updateOrderStatus);

export default router;
