import { DataTypes } from 'sequelize';
import db from '../db/connection';

// Definición del modelo de Producto
const Brand = db.define('brands', {
  name: { type: DataTypes.STRING},

}, {
  createdAt: false,
  updatedAt: false,
});

// Relaciones
export default Brand;
