    import { Model, DataTypes } from 'sequelize';
    import sequelize from '../config/database.js';

    class Accommodation extends Model {
        static async findById(id) {
            return await Accommodation.findByPk(id);
        }
    }

    Accommodation.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(255),
        },
        price:{
            type: DataTypes.INTEGER,
        },
        persons:{
            type: DataTypes.INTEGER,
        },
        bedrooms:{
            type: DataTypes.INTEGER,
        },
        hasPool:{
            type: DataTypes.BOOLEAN,
        },
        location:{
            type: DataTypes.STRING(255),
        },
        image:{
            type: DataTypes.BLOB,
        },
        description:{
            type: DataTypes.TEXT,
        },
        category:{
            type: DataTypes.STRING(255)
        }
    },{
        sequelize,
        modelName: 'Accommodation',
        tableName: 'accommodations',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    export default Accommodation;