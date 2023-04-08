const SuperDao = require("./superDao");
const logger = require("../config/logger");
const { Op } = require("sequelize");
const models = require("../models");
const SubProjectAdditionalInfoDetail = models.sub_project_additional_info_detail;

class SubProjectAdditionalInfoDetailDao extends SuperDao {
  constructor() {
    super(SubProjectAdditionalInfoDetail);
  }
  async exclude(subProjecId, data) {
    try {
      const result = await SubProjectAdditionalInfoDetail.findAll(
        {
          where: {
            sub_project_additional_info_id: subProjecId,
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
      const result = await SubProjectAdditionalInfoDetail.findAll(
        {
          where: {
            sub_project_additional_info_id: subProjectId,
          }
        }
      )
      return result;
    } catch (error) {
      logger.log(error)
    }
  }
}

module.exports = SubProjectAdditionalInfoDetailDao;
