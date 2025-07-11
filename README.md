# DineBot

DineBot is a chatbot-based restaurant management system built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to interact with a smart restaurant assistant in a chat UI that mimics Instagram Direct Messages. Users can discover restaurants, browse menus, make reservations, place orders, simulate payments, and more — all in real-time.

----------------------------
Tech Stack
----------------------------
Frontend:
- React.js
- TailwindCSS or styled-components
- Socket.IO-client

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO

Database:
- MongoDB

----------------------------
Features
----------------------------
1. Restaurant Discovery
- Filter by cuisine, price range, location (fixed to Jaipur).
- 30+ pre-filled Jaipur restaurants with name, cuisine, location, seat capacity, menu, image, and price range.

2. Menu Exploration
- Displays full menu of the selected restaurant.
- Menu includes item name, description, price, optional image, and dummy star ratings.

3. Reservation Management
- Choose restaurant, number of guests, date/time, and special instructions.
- Save reservation to MongoDB with status: Confirmed or Cancelled.

4. Ordering System
- Add/remove menu items to a virtual cart.
- Store in MongoDB with order status: Pending, Preparing, Delivered.

5. Dummy Payment Integration
- Modal shows Terms and Conditions checkbox and a “Pay” button.
- On click, simulate successful payment.
- Store payment as paid/unpaid in MongoDB.

6. Order Tracking
- Real-time status updates via Socket.IO (e.g., Preparing → Out for Delivery).

7. Table Management
- View and manage reservations and orders.

8. Personalized Recommendations
- Based on previous session’s order history, recommend similar restaurants or dishes.

----------------------------
Folder Structure
----------------------------

DineBot/
├── client/                  # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   └── package.json
│
├── server/                 # Node Backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── socket/
│   ├── utils/
│   ├── jaipur_restaurants.json
│   ├── app.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── .gitignore
├── README.md
└── package-lock.json

----------------------------
Environment Variables
----------------------------

server/.env:
PORT=3000  
MONGO_URI=mongodb://localhost:27017/dinebot  
SESSION_SECRET=yourSecret  
SESSION_MAX_AGE=3600000  
DB_NAME=dinebot

client/.env:
REACT_APP_API_URL=http://localhost:3000

----------------------------
How to Run the Project
----------------------------

1. Clone the repository
   git clone https://github.com/Sunil-0507/DineBot.git
   cd DineBot

2. Install dependencies

   Backend:
   cd server
   npm install

   Frontend:
   cd ../client
   npm install

3. Start backend server
   cd ../server
   npm run dev

4. Start frontend React app
   cd ../client
   npm start

----------------------------
Socket.IO Flow
----------------------------

- Realtime messaging between bot and user.
- Typing indicator animation.
- Order and reservation status push updates via WebSocket.

----------------------------
Chat Flow
----------------------------

Welcome to DineBot!
Choose an option:
1. Discover Restaurants
2. View Menu
3. Make Reservation
4. Place Order
5. Checkout
6. Track Order
7. Cancel Reservation or Order
8. View Recommendations
0. Exit

----------------------------
Sample Data
----------------------------

jaipur_restaurants.json:
- Contains over 30 dummy restaurants
- Each restaurant includes:
  - name
  - location (Jaipur)
  - cuisine
  - image
  - seat capacity
  - occupancy
  - price range
  - menu items with dummy data

----------------------------
Contributors
----------------------------

Sunil Pattupogula (https://github.com/Sunil-0507)

----------------------------
License
----------------------------

MIT License
