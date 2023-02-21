'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Project extends Model {
        static associate(models) {
            this.hasMany(models.sub_project, { foreignKey: 'project_id', sourceKey: 'id' });
            this.belongsToMany(models.worker, { through: "WorkerProjectLink", foreignKey: 'project_id' })
            this.hasMany(models.sub_project, { foreignKey: 'project_id', sourceKey: 'id' })
        }
    }
    Project.init({
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
        code: {
            type: DataTypes.UUID,
            unique: true,
            allowNull: false
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }

    }, {
        sequelize: sequelize,
        modelName: 'project',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    return Project;
}