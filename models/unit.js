'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Unit extends Model {
        static associate(models) {
            this.belongsTo(models.level, { foreignKey: 'level_id', targetKey: 'id' });
            this.belongsTo(models.type, { foreignKey: 'type_id', targetKey: 'id' });

        }

    }
    Unit.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        code: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('AVAILABLE', 'HOLD', 'SOLD')
        },



    }, {
        sequelize: sequelize,
        modelName: 'unit',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    return Unit;
}