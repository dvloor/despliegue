import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

// Definir una interfaz con los atributos
interface AdminAttributes {
    id?: number;
    user: string;
    password: string;
}

// Definir el modelo tipado
class Admin extends Model<AdminAttributes> implements AdminAttributes {
    public id!: number;
    public user!: string;
    public password!: string;
}

// Inicializar el modelo con Sequelize
Admin.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: db,
    tableName: 'admins',
    timestamps: false
});

export default Admin;
