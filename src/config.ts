// src/config.ts
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    name: process.env.DB_NAME || 'almacen',
    port: parseInt(process.env.DB_PORT || '3306', 10),
  },
};
