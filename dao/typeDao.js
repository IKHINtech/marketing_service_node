const SuperDao = require("./superDao");

const models = require("../models");
const Type = models.type;

class TypeDeo extends SuperDao {
  constructor() {
    super(Type);
  }
}

module.exports = TypeDeo;
