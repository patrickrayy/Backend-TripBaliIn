import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class User extends Model {}

User.init({
        name : {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        role:{
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone : {
            type: DataTypes.STRING,
            allowNull: false
        },
        tanggal_lahir: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
        {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
        createdAt: 'created_at',  
        updatedAt: 'updated_at',
        }
);

export default User;