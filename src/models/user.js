    import { Model, DataTypes } from 'sequelize';
    // import sequelize from '../config/database.js';
    // import bcrypt from 'bcryptjs';

    class User extends Model {
        static associate(models) {
            User.hasOne(models.Auths, { foreignKey: 'id', as: 'auth' });
          }

    }
    User.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        role: {
            type: DataTypes.STRING,
            allowNull: true
        },
        location: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tanggal_lahir: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    export default User;
