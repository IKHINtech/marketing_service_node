const httpStatus = require("http-status");
const ProjectDao = require("../dao/projectDao");

const { v4: uuidv4 } = require('uuid');

const responseHandler = require('../helper/responseHandler');
const logger = require("../config/logger");

class ProjectService {
    constructor() {
        this.projectDao = new ProjectDao();
    }

    /**
     * Create a Project
     * @param {Object} projectBody
     * @returns {Object}
     */
    createProject = async (projectBody) => {
        try {
            let message = 'success create project';
            if (await this.projectDao.isNameExists(projectBody.name)) {

                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Nama sudah ada');

            }
            const uuid = uuidv4();
            projectBody.name = projectBody.name;
            projectBody.id = uuid;
            projectBody.code = projectBody.code;

            let projectData = await this.projectDao.create(projectBody);
            if (!projectData) {
                message = 'Register failed';
                return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
            }
            projectData = projectData.toJSON();

            return responseHandler.returnSuccess(httpStatus.CREATED, message, projectData);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something whrong');

        }
    }
}

module.exports = ProjectService;