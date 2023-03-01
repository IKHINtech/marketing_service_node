const ProjectService = require("../service/ProjectService");
const logger = require('../config/logger');
const httpStatus = require('http-status');
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
    }

    getbyId = async (req, res) => {
        let data = await this.projectService.findById(req.params.id);
        res.status(data.statusCode).send(data.response)
    }

    getAllPaginated = async (req, res) => {
        let page = 1;
        let size = 10;
        if ('page' in req.query && req.query['page'] != '') {
            page = parseInt(req.query['page'], 10);
        }
        if ('size' in req.query && req.query['size'] != '') {
            size = parseInt(req.query['size'], 10);
        }
        let query;
        if ('search' in req.query && req.query['search'] != '') {
            query = {
                [Op.or]: [
                    {
                        name: {
                            [Op.like]: `%${req.query['search']}%`
                        },
                    },
                    {
                        code: {
                            [Op.like]: `%${req.query['search']}%`

                        }
                    }
                ]
            }
        } else {
            query == {};
        }
        let data = await this.projectService.getAllPaginated(query, page, size);
        res.status(data.statusCode).send(data.response);
    }

    delete = async (req, res) => {
        let data = await this.projectService.delete(req.params.id);
        res.status(data.statusCode).send(data.response);
    }
}

module.exports = ProjectController;