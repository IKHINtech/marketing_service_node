const SubCategoryService = require("../service/SubCategoryService");
const logger = require("../config/logger");
const httpStatus = require("http-status");

class SubCategoryController {
  constructor() {
    this.service = new SubCategoryService();
  }

  create = async (req, res) => {
    try {
      const data = await this.service.create(req.body);
      const { status, msg, result } = data.response;

      res.status(data.statusCode).send({ status, msg, result });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
  getById = async (req, res) => {
    try {
      const data = await this.service.findById(req.params.id);
      res.status(data.statusCode).send(data.response);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  getAllPaginated = async (req, res) => {
    try {
      let page = parseInt(req.query["page"], 10) ?? 1;
      let size = parseInt(req.query["size"], 10) ?? 10;
    }
    catch (e) {

    }
  }
}

module.exports = SubCategoryController;