"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SubProjectImage extends Model {
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
  SubProjectImage.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      iamge: { type: DataTypes.STRING, allowNull: true },
      priority: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize: sequelize,
      modelName: "sub_project_image",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return SubProjectImage;
};
