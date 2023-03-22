const SuperDao = require("./superDao");

const models = require("../models");

const Category = models.category;

class CategoryDao extends SuperDao {
  constructor() {
    super(Category);
  }
}

module.exports = CategoryDao;
