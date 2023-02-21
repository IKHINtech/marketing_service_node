'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SubCategory extends Model {

        static associate(models) {
            this.hasMany(models.type, { foreignKey: 'type_id', sourceKey: 'id' });
            this.belongsTo(models.category, { foreignKey: 'category_id', targetKey: 'id' })

        }

    }
    SubCategory.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },


    }, {
        sequelize: sequelize,
        modelName: 'sub_category',
        createdAt: 'created_at',
        updatedAt: 'updated_at'

    });
    return SubCategory;
}