const ProjectService = require("../service/ProjectService");
const logger = require('../config/logger');
const httpStatus = require('http-status');

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
}

module.exports = ProjectController;