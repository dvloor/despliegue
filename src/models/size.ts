import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Size = db.define('sizes', {
  size: {type: DataTypes.STRING}
}, { 
    createdAt: false,
    updatedAt: false,
});

export default Size;
