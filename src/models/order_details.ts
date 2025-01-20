import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Order from './orders';
import Product from './products';

// Definición del modelo de Producto
const OrderDetail = db.define('order_details', {
    quantity: {type: DataTypes.NUMBER},
    unit_price: {type: DataTypes.DECIMAL},
}, {
  createdAt: false,
  updatedAt: false,
});

// Relaciones
OrderDetail.belongsTo(Order, { foreignKey: 'order_id', as: 'order' }); // Alias opcional para simplificar los queries
Order.hasOne(OrderDetail, { foreignKey: 'order_id' });

OrderDetail.belongsTo(Product, { foreignKey: 'product_id', as: 'product' }); // Alias opcional para simplificar los queries
Product.hasMany(OrderDetail, { foreignKey: 'product_id' });

export default OrderDetail;
