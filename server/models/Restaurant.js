import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  imageUrl: String,
  rating: { type: Number, default: 4.0 } 
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, default: 'Jaipur' },
  cuisine: { type: String, required: true },
  priceRange: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  imageUrl: { type: String },
  seatCapacity: { type: Number, required: true },
  occupancy: { type: Number, default: 0 },
  menu: [menuItemSchema]
}, {
  timestamps: true
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export default Restaurant;
