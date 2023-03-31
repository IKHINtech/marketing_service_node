"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SubProjectAdditionalInfo extends Model {
    static associate(models) {
      this.belongsTo(models.sub_project, {
        foreignKey: "sub_project_id",
        targetKey: "id",
      });
      this.hasMany(models.sub_project_additional_info_detail, {
        foreignKey: "sub_project_additional_info_id",
        sourceKey: "id"
      })
    }
  }
  SubProjectAdditionalInfo.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },

      key: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      prioritas: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize: sequelize,
      modelName: "sub_project_additional_info",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return SubProjectAdditionalInfo;
};
