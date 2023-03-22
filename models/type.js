"use strict";
const { Model, Deferrable } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    static associate(models) {
      this.belongsTo(models.sub_project, {
        foreignKey: "sub_project_id",
        targetKey: "id",
      });
      this.belongsTo(models.sub_category, {
        foreignKey: "sub_category_id",
        targetKey: "id",
      });
      this.hasMany(models.unit, { foreignKey: "type_id", sourceKey: "id" });
      this.hasMany(models.payment_mode, {
        foreignKey: "type_id",
        sourceKey: "id",
      });
    }
  }
  Type.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      length_area: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      width_area: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      surface_area: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      building_area: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      bathroom: DataTypes.INTEGER,
      bedroom: DataTypes.INTEGER,
    },
    {
      sequelize: sequelize,
      modelName: "type",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Type;
};
