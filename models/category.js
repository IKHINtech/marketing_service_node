'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.sub_category, { foreignKey: 'category_id', sourceKey: 'id' });
    }
  }
  Category.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING
  }, {
    sequelize: sequelize,
    modelName: 'category',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Category;
};