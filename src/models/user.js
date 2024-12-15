import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class User extends Model {
    static async findByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    static async findById(id) {
        return await User.findByPk(id);
    }

    static async updateProfile(id, data) {
        const user = await User.findByPk(id);
        if (user) {
            return await user.update(data);
        }
        return null;
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
        allowNull: true,
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