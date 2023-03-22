const httpStatus = require("http-status");
const logger = require("../config/logger");
const SubProjectService = require("../service/SubProjectService");

class SubProjectController {
  constructor() {
    this.subProjectService = new SubProjectService();
  }
  create = async (req, res) => {
    try {
      const subProject = await this.subProjectService.create(req.body);
      const { status } = subProject.response;
      const { message, data } = subProject.response;
      res.status(subProject.statusCode).send({ status, data, message });
    } catch (e) {
      logger.log(e);
      res.status(httpStatus.BAD_REQUEST).send(e);
    }
  };

  getById = async (req, res) => {
    try {
      let data = await this.subProjectService.findById(req.params.id);
      res.status(data.statusCode).send(data.response);
    } catch (e) {
      logger.log(e);
      res.status(httpStatus.BAD_REQUEST).send(e);
    }
  };

  getAllPaginated = async (req, res) => {
    let page = 1;
    let size = 10;
    if ("page" in req.query && req.query["page"] != "") {
      page = parseInt(req.query["page"], 10);
    }
    if ("size" in req.query && req.query["size"] != "") {
      size = parseInt(req.query["size"], 10);
    }
    let query;
    if ("search" in req.query && req.query["search"] != "") {
      query = {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${req.query["search"]}%`,
            },
          },
          {
            code: {
              [Op.like]: `%${req.query["search"]}%`,
            },
          },
        ],
      };
    } else {
      query == {};
    }
    let data = await this.subProjectService.getPaginated(query, page, size);
    res.status(data.statusCode).send(data.response);
  };

  getAll = async (req, res) => {
    try {
      let query;
      if ("search" in req.query && req.query["search"] != "") {
        query = {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${req.query["search"]}%`,
              },
            },
            {
              code: {
                [Op.like]: `%${req.query["search"]}%`,
              },
            },
          ],
        };
      } else {
        query == {};
      }
      let data = await this.subProjectService.getAll(query);
      res.status(data.statusCode).send(data.response);
    } catch (e) {
      logger.log(e);
      res.status(httpStatus.BAD_REQUEST).send(e);
    }
  };

  update = async (req, res) => {
    try {
      const project = await this.subProjectService.update(
        req.params.id,
        req.body
      );
      res.status(project.statusCode).send(project.response);
    } catch (error) {
      logger.log(error);
      res.status(httpStatus.BAD_REQUEST).send(error);
    }
  };

  delete = async (req, res) => {
    let data = await this.subProjectService.delete(req.params.id);
    res.status(data.statusCode).send(data.response);
  };
}

module.exports = SubProjectController;
