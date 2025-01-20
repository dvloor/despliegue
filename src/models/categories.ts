import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Category = db.define('categories', {
    name: { type: DataTypes.STRING}
}, {
    createdAt: false,
    updatedAt: false,
});

export default Category;
