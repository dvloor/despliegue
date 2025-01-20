import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Brand from './brands';
import Size from './size';
import Category from './categories';

// Definición del modelo de Producto
const Product = db.define('products', {
  name: { type: DataTypes.STRING, allowNull: false},
  description: { type: DataTypes.STRING },
  price: { type: DataTypes.DECIMAL, allowNull: false},
  stock: { type: DataTypes.INTEGER, allowNull: false},
  discount_price: { type: DataTypes.DECIMAL},
}, {
  createdAt: false,
  updatedAt: false,
});

// Relaciones
Product.belongsTo(Brand, { foreignKey: 'brand_id', as: 'brand' }); // Alias opcional para simplificar los queries
Brand.hasMany(Product, { foreignKey: 'brand_id' });

Product.belongsTo(Size, { foreignKey: 'size_id', as: 'size' });
Size.hasMany(Product, { foreignKey: 'size_id' });

Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Category.hasMany(Product, { foreignKey: 'category_id' });

export default Product;
