import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';

dotenv.config();

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'defaultSecret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    dbName: process.env.DB_NAME,
    collectionName: 'sessions',
  }),
  cookie: {
    maxAge: parseInt(process.env.SESSION_MAX_AGE) || 3600000, // 1 hour default
    httpOnly: true,
    sameSite: 'lax',
  },
});

export default sessionMiddleware;
