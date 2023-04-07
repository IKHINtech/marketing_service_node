const SuperDao = require("./superDao");
const models = require("../models");
const SubProject = models.sub_project;
const logger = require("../config/logger");
const Project = models.project;



class SubProjectDao extends SuperDao {
  constructor() {
    super(SubProject);
  }
  async getDataTableData(
    where,
    limit,
    offset,
    order = [["created_at", "DESC"]]
  ) {
    return SubProject.findAndCountAll({
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      include: Project,
      where,
      order,
    })
      .then((result) => {
        return result;
      })
      .catch((e) => {
        logger.error(e);
        console.log(e);
        return [];
      });
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
  async create(data) {
    try {
      await SubProject.create(
        data,
        { includes: [] })

    } catch (e) {
      logger.error(e);

    }

  }
}

module.exports = SubProjectDao;
