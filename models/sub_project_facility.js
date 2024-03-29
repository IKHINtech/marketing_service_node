"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SubProjectFacility extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.sub_project, {
        foreignKey: "sub_project_id",
        targetKey: "id",
      });
    }
  }
  SubProjectFacility.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING(50),
    },
    {
      sequelize: sequelize,
      modelName: "sub_project_facility",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return SubProjectFacility;
};
