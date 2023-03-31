const SuperDao = require("./superDao");
const models = require("../models");
const SubProject = models.sub_project;

class SubProjectDao extends SuperDao {
  constructor() {
    super(SubProject);
  }
  async findByCode(code) {
    return SubProject.findOne({ where: { code } });
  }
  async isNameExists(code) {
    return SubProject.count({
      where: { code },
    }).then((count) => {
      if (count != 0) {
        return true;
      } else {
        return false;
      }
    });
  }
}

module.exports = SubProjectDao;
