DineBot – Restaurant Chatbot Web App
DineBot is a full-stack chatbot-based restaurant management system built using the MERN stack (MongoDB, Express, React, Node.js) and Socket.IO. It provides a smart, Instagram-style chat interface for discovering restaurants, exploring menus, making reservations, placing orders, and simulating payments—all in one seamless user experience.

Features
1. Restaurant Discovery
Search restaurants by cuisine, location (Jaipur), or price range.
Each restaurant includes name, image, cuisine, location, price range, seat capacity, occupancy, and a digital menu.

2. Menu Exploration
View the complete digital menu of any restaurant.
Menu items include name, description, price, optional image, and star ratings.

3. Reservation Management
Make reservations by selecting restaurant, date, time, guests, and special requests.
Save reservation data in MongoDB with status: Confirmed or Cancelled.
View and manage reservations in the chat interface.

4. Ordering System
Select items from menu and add them to cart.
Modify cart before checkout.
Order status updates: Pending, Preparing, Ready, Out for Delivery, Delivered.

5. Dummy Payment Integration
After checkout, a modal simulates the payment process.
User accepts terms and confirms payment.
Status saved as paid or unpaid in MongoDB.

6. Order Tracking
Track live order status with real-time updates using WebSockets.

7. Table and Order Management
View current and past reservations and orders.
Cancel or modify reservations and orders.

8. Personalized Recommendations
Based on session/order history, the chatbot suggests restaurants and dishes.

Tech Stack
Frontend:
React.js
styled-components (or TailwindCSS)
socket.io-client
Axios

Backend:
Node.js
Express.js
MongoDB + Mongoose
Socket.IO
express-session

📁 Folder Structure
DineBot/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/                // Images and avatars
│   │   ├── components/           // UI components (ChatBox, MessageBubble, PaymentModal)
│   │   ├── pages/                // ChatPage
│   │   ├── services/             // socket.js
│   │   ├── utils/                // formatter.js
│   │   ├── App.js
│   │   └── index.js
│   └── .env
│
├── server/
│   ├── config/                   // db.js and session.js
│   ├── controllers/             // chatController, orderController, etc.
│   ├── models/                  // Restaurant, Reservation, Order, etc.
│   ├── routes/                  // REST API endpoints
│   ├── socket/                  // index.js for handling events
│   ├── utils/                   // formatMessage.js
│   ├── jaipur_restaurants.json  // Seed data for 30 restaurants
│   ├── app.js
│   ├── server.js
│   ├── .env
│   └── package.json

.env Configuration
server/.env
PORT=3000
MONGO_URI=mongodb://localhost:27017/dinebot
SESSION_SECRET=yourSecretKey
SESSION_MAX_AGE=3600000
DB_NAME=dinebot

client/.env
REACT_APP_API_URL=http://localhost:3000

Getting Started

1. Clone the Repository
git clone https://github.com/sunil-0507/DineBot.git
cd DineBot

2. Install Dependencies
# Backend
cd server
npm install
# Frontend
cd ../client
npm install

3. Seed the Database
Make sure MongoDB is running locally, then in the server directory:

node scripts/seedRestaurants.js
(This script should read jaipur_restaurants.json and populate your DB.)

4. Start the Development Servers
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm start
Access the app at http://localhost:3000

Example Usage
User lands on chat interface and is greeted by the DineBot.

DineBot provides the following options:
1. Discover Restaurants
2. View Menu
3. Make Reservation
4. Place Order
5. Checkout
6. Track Order
7. Cancel Reservation or Order
8. View Recommendations
0. Exit
User selects an option (e.g., "3" to make a reservation).
DineBot guides through a conversational flow to complete the task.
All data is stored and reflected in MongoDB and session history.


License
This project is for educational/demo purposes only. All dummy data and assets used are for demonstration and are not real.