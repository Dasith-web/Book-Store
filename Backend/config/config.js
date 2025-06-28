import dotenv from 'dotenv';
dotenv.config();

export default {
  mongoURI: process.env.MONGO_URI || 'your_default_uri',
  jwtSecret: process.env.JWT_SECRET || 'your_default_jwt',
  port: process.env.PORT || 4000
};
