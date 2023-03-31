const SubCategoryDao = require("../dao/subCategoryDao");
const { v4: uuidv4 } = require("uuid");
const responseHandler = require("../helper/responseHandler");
const httpStatus = require("http-status");
const logger = require("../config/logger");

class SubCategotyService {
  constructor() {
    this.repo = new SubCategoryDao();
  }

  create = async (data) => {
    try {
      let msg = "success create sub category data";
      const uuid = uuidv4();
      data.id = uuid;
      data.name = data.name;
      data.category_id = data.category_id;

      let result = await this.repo.create(data);
      if (!result) {
        msg = "failed to create data";
        return responseHandler.returnError(httpStatus.BAD_REQUEST, msg);
      }
      result = result.toJSON();
      return responseHandler.returnSuccess(httpStatus.OK, msg, result);
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
      const subCategoryes = await this.repo.getDataTableData(
        query,
        limit,
        offset
      );
      const data = responseHandler.getPaginationData(
        subCategoryes,
        page,
        limit
      );
      return responseHandler.returnSuccess(httpStatus.OK, msg, data);
    } catch (e) {
      logger.log(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, e);
    }
  };

  getAll = async (query) => {
    try {
      const msg = "success get all data";
      const data = await this.repo.findByWhere(query, ["name", "asc"]);
      return responseHandler.returnSuccess(httpStatus.OK, msg, data);
    } catch (e) {
      logger.log(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, e);
    }
  };

  findById = async (id) => {
    try {
      let msg = "success get by id";
      const data = await this.repo.findById(id);
      if (data == null) {
        msg = 'Not Found';
        return responseHandler.returnSuccess(404, msg, data)
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
      await this.repo.updateById(data, id);
      return responseHandler.returnSuccess(httpStatus.OK, msg);
    } catch (e) {
      logger.log(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, e);
    }
  };
}

module.exports = SubCategotyService;
