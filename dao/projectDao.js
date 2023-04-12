const SuperDao = require("./superDao");

const models = require("../models");

const Project = models.project;

class ProjectDao extends SuperDao {
  constructor() {
    super(Project);
  }
  async findByCode(code) {
    return Project.findOne({ where: { code } });
  }
  async isCodeExists(code) {
    return Project.count({
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

module.exports = ProjectDao;
