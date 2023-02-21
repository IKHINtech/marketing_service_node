'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class PaymentMode extends Model {
        static associate(models) {
            this.belongsTo(models.type, { foreignKey: 'type_id', targetKey: 'id' })
            this.hasMany(models.payment_mode_detail, { foreignKey: 'payment_mode_id', sourceKey: 'id' })

        }

    }
    PaymentMode.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        start_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        key: {
            type: DataTypes.STRING,
            allowNull: false
        },
        value: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        prioritas: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

    }, {
        sequelize: sequelize,
        modelName: 'payment_mode',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    return PaymentMode;
}