const SuperDao = require("./superDao");

const models = require("../models");
const Unit = models.unit;

class UnitDao extends SuperDao {
  constructor() {
    super(Unit);
  }
}

module.exports = UnitDao;
