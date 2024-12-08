import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class User extends Model {}

User.init({
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birthDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
        {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
        }
);

export default User;