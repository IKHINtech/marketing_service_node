'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SubProject extends Model {

        static associate(models) {
            this.belongsTo(models.project, { foreignKey: 'project_id', targetKey: 'id' });
            this.hasMany(models.sub_project_additional_info, { foreignKey: 'sub_project_id', sourceKey: 'id' });
            this.hasMany(models.sub_project_facility, { foreignKey: 'sub_project_id', sourceKey: 'id' });
            this.hasMany(models.sub_project_image, { foreignKey: 'sub_project_id', sourceKey: 'id' });
            this.hasMany(models.level, { foreignKey: 'sub_project_id', sourceKey: 'id' });
            this.hasMany(models.type, { foreignKey: 'sub_project_id', sourceKey: 'id' });
        }

    }
    SubProject.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        code: {
            type: DataTypes.UUID,
            unique: true,
            allowNull: false
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        booking_fee: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        description: DataTypes.TEXT,
        lat: DataTypes.DECIMAL(9, 6),
        lng: DataTypes.DECIMAL(9, 6),
        project_id: {
            type: DataTypes.UUID,

        }


    }, {
        sequelize: sequelize,
        modelName: 'sub_project',
        createdAt: 'created_at',
        updatedAt: 'updated_at'


    });
    return SubProject;
}