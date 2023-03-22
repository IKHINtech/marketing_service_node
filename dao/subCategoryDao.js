const SuperDao = require("./superDao");
const models = require("../models");

const SubCategory = models.sub_category;

class SubCategoryDao extends SuperDao {
  constructor() {
    super(SubCategory);
  }
}

module.exports = SubCategoryDao;
