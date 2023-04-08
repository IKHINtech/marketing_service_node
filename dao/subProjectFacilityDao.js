const SuperDao = require("./superDao");
const logger = require("../config/logger");
const { Op } = require("sequelize");
const models = require("../models");
const SubProjectFacility = models.sub_project_facility;

class SubProjectFacilityDao extends SuperDao {
  constructor() {
    super(SubProjectFacility);
  }
  async exclude(subProjecId, data) {
    try {
      const result = await SubProjectFacility.findAll(
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

  async findBy(subProjectId, data) {
    try {
      const result = await SubProjectFacility.findAll(
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



module.exports = SubProjectFacilityDao;
