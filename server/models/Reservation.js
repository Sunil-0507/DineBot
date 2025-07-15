import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  userSessionId: {
    type: String,
    required: true
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  guestCount: {
    type: Number,
    required: true
  },
  reservationDate: {
    type: Date,
    required: true
  },
  reservationTime: {
    type: String,
    required: true
  },
  specialRequests: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Confirmed', 'Cancelled'],
    default: 'Confirmed'
  }
}, {
  timestamps: true
});

const Reservation = mongoose.model('Reservation', reservationSchema);
export default Reservation;
