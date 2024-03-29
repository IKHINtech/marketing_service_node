const ProjectService = require("../service/ProjectService");
const logger = require("../config/logger");
const httpStatus = require("http-status");
const { Op } = require("sequelize");

class ProjectController {
  constructor() {
    this.projectService = new ProjectService();
  }
  create = async (req, res) => {
    try {
      const project = await this.projectService.createProject(req.body);
      const { status } = project.response;

      const { message, data } = project.response;
      res.status(project.statusCode).send({ status, message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  getbyId = async (req, res) => {
    let data = await this.projectService.findById(req.params.id);
    res.status(data.statusCode).send(data.response);
  };

  getAllPaginated = async (req, res) => {
    let page = req.query.page == undefined ? 1 : parseInt(req.query.page, 10);
    let size = req.query.size == undefined ? 10 : parseInt(req.query.size, 10);

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
    let data = await this.projectService.getAllPaginated(query, page, size);
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
      let data = await this.projectService.getAll(query);
      res.status(data.statusCode).send(data.response);
    } catch (e) {
      logger.log(e);
      res.status(httpStatus.BAD_REQUEST).send(e);
    }
  };

  update = async (req, res) => {
    try {
      const project = await this.projectService.update(req.params.id, req.body);
      res.status(project.statusCode).send(project.response);
    } catch (error) {
      logger.log(error);
      res.status(httpStatus.BAD_REQUEST).send(error);
    }
  };

  delete = async (req, res) => {
    let data = await this.projectService.delete(req.params.id);
    res.status(data.statusCode).send(data.response);
  };
}

module.exports = ProjectController;
