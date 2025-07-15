import express from 'express';
import {
  createReservation,
  getUserReservations,
  cancelReservation,
  updateReservation
} from '../controllers/reservationController.js';

const router = express.Router();

// Create a new reservation
router.post('/', createReservation);

// Get all reservations for a user (based on user ID or session)
router.get('/user/:userId', getUserReservations);

// Cancel a reservation
router.put('/:reservationId/cancel', cancelReservation);

// Modify a reservation
router.put('/:reservationId', updateReservation);

export default router;
