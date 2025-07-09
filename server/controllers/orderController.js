// server/controllers/orderController.js
import Order from '../models/Order.js';

// @desc    Place a new order
// @route   POST /api/orders
export const placeOrder = async (req, res) => {
  try {
    const { restaurantName, userId, items } = req.body;

    if (!restaurantName || !userId || !items || items.length === 0) {
      return res.status(400).json({ message: 'Missing order data' });
    }

    const totalAmount = items.reduce((sum, item) => sum + item.price, 0);

    const newOrder = new Order({
      restaurantName,
      user: userId,
      items,
      totalAmount,
      status: 'Pending',
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error('Error placing order:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @desc    Get all orders of a user
// @route   GET /api/orders/:userId
export const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @desc    Update order status
// @route   PATCH /api/orders/:orderId
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!status) return res.status(400).json({ message: 'Status is required' });

    const updated = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json(updated);
  } catch (err) {
    console.error('Error updating order:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
