'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class PaymentModeDetail extends Model {
        static associate(models) {
            this.belongsTo(models.payment_mode, { foreignKey: 'payment_mode_id', targetKey: 'id' })

        }

    }
    PaymentModeDetail.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },

        key: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        value: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        priorityas: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

    }, {
        sequelize: sequelize,
        modelName: 'payment_mode_detail',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    return PaymentModeDetail;
}