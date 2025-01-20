import { DataTypes } from 'sequelize';
import db from '../db/connection';

// Definición del modelo de Producto
const Customer = db.define('customers', {
  name: { type: DataTypes.STRING},
  lastname: {type: DataTypes.STRING},
  email: {type: DataTypes.STRING, allowNull: false},
  phone: {type: DataTypes.STRING, allowNull: false},
  signin_date: {type: DataTypes.DATE},

}, 
{
  createdAt: false,
  updatedAt: false,
  tableName: 'customers',
  freezeTableName: true 
}
);

// Relaciones
export default Customer;
