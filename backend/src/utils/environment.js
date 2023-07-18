require('dotenv').config();

const config = {
  PORT: process.env.PORT,
  ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN,
  MOVIES_API: process.env.MOVIES_API,
  API_KEY: process.env.API_KEY,
  NODE_ENV: process.env.NODE_ENV
};

export default config;