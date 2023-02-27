'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        static associate(models) {
            this.belongsToMany(models.worker, { through: "WorkerRoleLink", foreignKey: 'role_id' })

        }

    }
    Role.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },

        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },


    }, {
        sequelize: sequelize,
        modelName: 'role',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    return Role;
}