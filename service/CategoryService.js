const CategoryDao = require("../dao/categoryDao");
const { v4: uuidv4 } = require("uuid");
const responseHandler = require("../helper/responseHandler");
const httpStatus = require("http-status");
const logger = require("../config/logger");

class CategoryService {
  constructor() {
    this.categoryDao = new CategoryDao();
  }
  create = async (data) => {
    try {
      let msg = "success create category data";
      const uuid = uuidv4();
      data.name = data.name;
      data.id = uuid;

      let category = await this.categoryDao.create(data);
      if (!category) {
        msg = "failed to create category data";
        return responseHandler.returnError(httpStatus.BAD_REQUEST, msg);
      }

      category = category.toJSON();
      return responseHandler.returnSuccess(httpStatus.CREATED, msg, category);
    } catch (e) {
      logger.log(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, e);
    }
  };

  getPaginated = async (query, page = 1, size = 10) => {
    let limit = size;
    let offset = size * (page - 1);

    try {
      let msg = "success get paginated data";
      const categorys = await this.categoryDao.getDataTableData(
        query,
        limit,
        offset
      );
      const data = responseHandler.getPaginationData(categorys, page, limit);
      return responseHandler.returnSuccess(httpStatus.OK, msg, data);
    } catch (e) {
      logger.log(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, e);
    }
  };

  getAll = async (query) => {
    try {
      const msg = "success get all data";
      const data = await this.categoryDao.findByWhere(query, ["name", "asc"]);
      return responseHandler.returnSuccess(httpStatus.OK, msg, data);
    } catch (e) {
      logger.log(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, e);
    }
  };

  findById = async (id) => {
    try {
      let msg = "success get by id";
      const data = await this.categoryDao.findById(id);
      if (data == null) {
        msg = "Not Found";
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
      await this.categoryDao.updateById(data, id);
      return responseHandler.returnSuccess(httpStatus.OK, msg);
    } catch (e) {
      logger.log(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, e);
    }
  };
}

module.exports = CategoryService;
