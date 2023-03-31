const httpStatus = require("http-status");
const logger = require("../config/logger");
const LevelDao = require("../dao/levelDao");
const responseHandler = require("../helper/responseHandler");
const { v4: uuidv4 } = require("uuid");

class LevelService {
  constructor() {
    this.levelDao = new LevelDao();
  }
  create = async (data) => {
    try {
      let message = "success create level data";
      const uuid = uuidv4();
      data.name = data.name;
      data.id = uuid;
      data.code = data.code;
      data.sub_project_id = data.sub_project_id;

      let level = await this.levelDao.create(data);
      if (!level) {
        message = "Failed to create level data";
        return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
      }
      level = level.toJSON();

      return responseHandler.returnSuccess(httpStatus.CREATED, message, level);
    } catch (e) {
      logger.log(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, e);
    }
  };
  getPaginated = async (query, page = 1, size = 10) => {
    let limit = size;
    let offset = size * (page - 1);

    try {
      let message = "success get paginated data";
      const levels = await this.levelDao.getDataTableData(query, limit, offset);
      const data = responseHandler.getPaginationData(levels, page, size);
      return responseHandler.returnSuccess(httpStatus.OK, message, data);
    } catch (e) {
      logger.log(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, e);
    }
  };
  getAll = async (query) => {
    try {
      const msg = "success get all data";
      const data = await this.levelDao.findByWhere(query, ["name", "asc"]);
      return responseHandler.returnSuccess(httpStatus.OK, msg, data);
    } catch (e) {
      logger.log(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, e);
    }
  };

  findById = async (id) => {
    try {
      let msg = "success get  by id";
      const data = await this.levelDao.findById(id);
      if (data == null) {
        msg = 'Not Found'
        return responseHandler.returnSuccess(404, msg, data);
      }
      return responseHandler.returnSuccess(httpStatus.OK, msg, data);
    } catch (e) {
      logger.log(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, e);
    }
  };

  update = async (id, data) => {
    try {
      const msg = "success update data";
      await this.levelDao.updateById(data, id);
      return responseHandler.returnSuccess(httpStatus.OK, msg);
    } catch (e) {
      logger.log(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, e);
    }
  };
}

module.exports = LevelService;
