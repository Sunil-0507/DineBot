// server/controllers/reservationController.js
import Reservation from '../models/Reservation.js';

// @desc    Create a new reservation
// @route   POST /api/reservations
export const createReservation = async (req, res) => {
  try {
    const { userId, restaurantName, date, time, guests, specialRequest } = req.body;

    if (!userId || !restaurantName || !date || !time || !guests) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const reservation = new Reservation({
      user: userId,
      restaurantName,
      date,
      time,
      guests,
      specialRequest: specialRequest || '',
      status: 'Confirmed',
    });

    const saved = await reservation.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error creating reservation:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @desc    Get all reservations by user
// @route   GET /api/reservations/:userId
export const getReservationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const reservations = await Reservation.find({ user: userId }).sort({ date: 1 });
    res.status(200).json(reservations);
  } catch (err) {
    console.error('Error fetching reservations:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @desc    Cancel a reservation
// @route   PATCH /api/reservations/:reservationId
export const cancelReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;

    const updated = await Reservation.findByIdAndUpdate(
      reservationId,
      { status: 'Cancelled' },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Reservation not found' });

    res.status(200).json(updated);
  } catch (err) {
    console.error('Error cancelling reservation:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
