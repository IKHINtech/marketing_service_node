const SubCategoryService = require("../service/SubCategoryService");
const logger = require("../config/logger");
const httpStatus = require("http-status");

class SubCategoryController {
  constructor() {
    this.service = new SubCategoryService();
  }

  create = async (req, res) => {
    try {
      const result = await this.service.create(req.body);
      const { status, message, data } = result.response;

      res.status(result.statusCode).send({ status, message, data });
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
      let page = req.query.page == undefined ? 1 : parseInt(req.query.page, 10);
      let size = req.query.size == undefined ? 10 : parseInt(req.query.size, 10);
      const data = await this.service.getPaginated({}, page, size);
      res.status(data.statusCode).send(data.response);

    }
    catch (e) {
      logger.log(e);
      res.status(httpStatus.BAD_REQUEST).send(e);

    }
  }

  update = async (req, res) => {
    try {
      const data = await this.service.update(req.params.id, req.body);
      res.status(data.statusCode).send(data.response);
    } catch (e) {
      logger.log(e);
      res.status(httpStatus.BAD_REQUEST).send(e);

    }
  }
}

module.exports = SubCategoryController;