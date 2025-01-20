import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Customer from './customers';

// Definición del modelo de Producto
const Order = db.define('orders', {
    order_date: {type: DataTypes.DATE},
    total_price: {type: DataTypes.DECIMAL, allowNull: false},
    status: {type: DataTypes.ENUM('Pendiente','Enviado','Completado'), defaultValue:'Pendiente'},

}, {
  createdAt: false,
  updatedAt: false,
});

// Relaciones
Order.belongsTo(Customer, { foreignKey: 'customer_id', as: 'customer' }); // Alias opcional para simplificar los queries
Customer.hasMany(Order, { foreignKey: 'customer_id' });

export default Order;
