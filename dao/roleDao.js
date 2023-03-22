const SuperDao = require("./superDao");
const models = require("../models");
const Role = models.role;

class RoleDao extends SuperDao {
  constructor() {
    super(Role);
  }
}

module.exports = RoleDao;
