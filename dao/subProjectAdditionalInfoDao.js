const SuperDao = require("./superDao");
const logger = require("../config/logger");
const models = require("../models");
const { Op } = require("sequelize");
const SubProjectAdditionalInfo = models.sub_project_additional_info;

class SubProjectAdditionalInfoDao extends SuperDao {
  constructor() {
    super(SubProjectAdditionalInfo);
  }

  async exclude(subProjecId, data) {
    try {
      const result = await SubProjectAdditionalInfo.findAll(
        {
          where: {
            sub_project_id: subProjecId,
            id: {
              [Op.notIn]: data
            }

          }
        }
      )
      return result
    } catch (error) {
      logger.log(error)
    }
  }
  async findBy(subProjectId) {
    try {
      const result = await SubProjectAdditionalInfo.findAll(
        {
          where: {
            sub_project_id: subProjectId,
          }
        }
      )
      return result;

    } catch (error) {
      logger.log(error)
    }
  }
}

module.exports = SubProjectAdditionalInfoDao;
