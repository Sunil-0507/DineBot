import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  userSessionId: {
    type: String,
    required: true
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Paid', 'Unpaid'],
    default: 'Unpaid'
  },
  method: {
    type: String,
    default: 'Dummy Payment' 
  },
  paidAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
