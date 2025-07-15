import Restaurant from '../models/Restaurant.js';
import Reservation from '../models/Reservation.js';
import Order from '../models/Order.js';
import formatMessage from '../utils/formatMessage.js';

const sessions = new Map(); 

export const handleUserMessage = async (socket, message) => {
  const userId = socket.id;

  if (!sessions.has(userId)) {
    sessions.set(userId, { step: 'menu' });
    socket.emit('botMessage', formatMessage('DineBot', `Welcome to DineBot! How can I help you today?\n\n1. Discover Restaurants\n2. View Menu\n3. Make Reservation\n4. Place Order\n5. Checkout\n6. Track Order\n7. Cancel Reservation or Order\n8. View Recommendations\n0. Exit`));
    return;
  }

  const session = sessions.get(userId);
  const text = message.trim();

  switch (session.step) {
    case 'menu':
      switch (text) {
        case '1':
          session.step = 'discovering';
          const restaurants = await Restaurant.find({ location: 'Jaipur' }).limit(5);
          const list = restaurants.map((r, i) => `${i + 1}. ${r.name} (${r.cuisine}) - ₹${r.priceRange}`).join('\n');
          socket.emit('botMessage', formatMessage('DineBot', `Here are some restaurants in Jaipur:\n${list}\n\nReply with the number to view menu.`));
          session.restaurants = restaurants;
          break;

        case '2':
          socket.emit('botMessage', formatMessage('DineBot', `Please type the name of the restaurant to view its menu.`));
          session.step = 'viewing_menu';
          break;

        case '3':
          socket.emit('botMessage', formatMessage('DineBot', `Type the restaurant name for reservation:`));
          session.step = 'reserve_restaurant';
          break;

        case '4':
          socket.emit('botMessage', formatMessage('DineBot', `Enter restaurant name to start your order:`));
          session.step = 'ordering';
          break;

        case '5':
          socket.emit('botMessage', formatMessage('DineBot', `Opening payment modal...`));
          socket.emit('openPaymentModal');
          session.step = 'menu';
          break;

        case '6':
          socket.emit('botMessage', formatMessage('DineBot', `Your order is being prepared... Expected delivery in 30 mins.`));
          break;

        case '7':
          socket.emit('botMessage', formatMessage('DineBot', `Please enter the reservation/order ID to cancel:`));
          session.step = 'cancel_id';
          break;

        case '8':
          socket.emit('botMessage', formatMessage('DineBot', `We recommend: 1. Jaipur Spice Hub 🍽️\n2. Royal Rasoi 🌶️\n3. Chaat Junction 🥙`));
          break;

        case '0':
          socket.emit('botMessage', formatMessage('DineBot', `Thank you for using DineBot. Goodbye!`));
          sessions.delete(userId);
          break;

        default:
          socket.emit('botMessage', formatMessage('DineBot', `Invalid choice. Please enter a number from 0 to 8.`));
      }
      break;

    case 'discovering':
      const index = parseInt(text) - 1;
      const selected = session.restaurants?.[index];
      if (!selected) {
        socket.emit('botMessage', formatMessage('DineBot', `Invalid selection. Try again.`));
      } else {
        const menu = selected.menu.map(item => `- ${item.name} (₹${item.price})`).join('\n');
        socket.emit('botMessage', formatMessage('DineBot', `Menu for ${selected.name}:\n${menu}`));
      }
      session.step = 'menu';
      break;

    case 'viewing_menu':
      const res = await Restaurant.findOne({ name: new RegExp(text, 'i') });
      if (!res) {
        socket.emit('botMessage', formatMessage('DineBot', `Restaurant not found.`));
      } else {
        const menuItems = res.menu.map(item => `🍴 ${item.name} - ₹${item.price}\n${item.description}`).join('\n\n');
        socket.emit('botMessage', formatMessage('DineBot', `📜 Menu for ${res.name}:\n\n${menuItems}`));
      }
      session.step = 'menu';
      break;

    case 'reserve_restaurant':
      session.reservation = { restaurantName: text };
      socket.emit('botMessage', formatMessage('DineBot', `Enter date & time (e.g., 2025-07-15 19:30):`));
      session.step = 'reserve_datetime';
      break;

    case 'reserve_datetime':
      session.reservation.datetime = text;
      socket.emit('botMessage', formatMessage('DineBot', `Number of guests?`));
      session.step = 'reserve_guests';
      break;

    case 'reserve_guests':
      session.reservation.guests = parseInt(text);
      const saved = await Reservation.create({
        ...session.reservation,
        user: userId,
        status: 'Confirmed'
      });
      socket.emit('botMessage', formatMessage('DineBot', `Reservation confirmed at ${saved.restaurantName} for ${saved.guests} guests on ${saved.datetime}`));
      session.step = 'menu';
      break;

    case 'ordering':
      session.order = { items: [], restaurantName: text };
      socket.emit('botMessage', formatMessage('DineBot', `Add item name to order or type 'done' to finish:`));
      session.step = 'order_items';
      break;

    case 'order_items':
      if (text.toLowerCase() === 'done') {
        const order = await Order.create({
          restaurantName: session.order.restaurantName,
          user: userId,
          items: session.order.items,
          status: 'Pending'
        });
        socket.emit('botMessage', formatMessage('DineBot', `Order placed successfully for ₹${session.order.items.reduce((sum, i) => sum + i.price, 0)}. Track your order in '6. Track Order'.`));
        session.step = 'menu';
      } else {
        const restaurant = await Restaurant.findOne({ name: session.order.restaurantName });
        const item = restaurant.menu.find(i => i.name.toLowerCase() === text.toLowerCase());
        if (item) {
          session.order.items.push(item);
          socket.emit('botMessage', formatMessage('DineBot', `${item.name} added. Type another item or 'done'.`));
        } else {
          socket.emit('botMessage', formatMessage('DineBot', `Item not found in menu. Try again.`));
        }
      }
      break;

    case 'cancel_id':
      const cancelled = await Reservation.findByIdAndUpdate(text, { status: 'Cancelled' }) ||
                        await Order.findByIdAndUpdate(text, { status: 'Cancelled' });
      if (cancelled) {
        socket.emit('botMessage', formatMessage('DineBot', `Successfully cancelled.`));
      } else {
        socket.emit('botMessage', formatMessage('DineBot', `No reservation or order found with that ID.`));
      }
      session.step = 'menu';
      break;

    default:
      socket.emit('botMessage', formatMessage('DineBot', `Let’s start over. Type a number from the menu.`));
      session.step = 'menu';
  }

  sessions.set(userId, session); // Update session
};
