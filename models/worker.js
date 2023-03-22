"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Worker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.project, {
        through: "WorkerProjectLink",
        foreignKey: "project_id",
      });
      this.belongsToMany(models.role, {
        through: "WorkerRoleLink",
        foreignKey: "role_id",
      });
      // define association here
    }
  }
  Worker.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      status: DataTypes.INTEGER,
      email_verified: DataTypes.INTEGER,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
    },
    {
      sequelize: sequelize,
      modelName: "worker",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Worker;
};
