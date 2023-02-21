'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SubProjectAdditionalInfo extends Model {
        static associate(models) {
            this.belongsTo(models.sub_project, { foreignKey: 'sub_project_id', targetKey: 'id' })

        }
    }
    SubProjectAdditionalInfo.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },

        key: {
            type: DataTypes.STRING,
            allowNull: false
        },
        value: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },



    }, {
        sequelize: sequelize,
        modelName: 'sub_project_additional_info',
        createdAt: 'created_at',
        updatedAt: 'updated_at'

    });
    return SubProjectAdditionalInfo;

}