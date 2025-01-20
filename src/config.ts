// src/config.ts
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.host || 'localhost',
    user: process.env.user || 'root',
    password: process.env.password || '',
    name: process.env.name || 'almacen',
    PORT: parseInt(process.env.PORT || '3306', 10),
  },
};
