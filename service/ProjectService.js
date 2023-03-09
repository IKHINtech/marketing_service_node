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

    /**
     * Get all Project with paginate
     * @param {Object} query
     * @param {int} page
     * @param {Object} size
     * @returns {List Object}
     */
    getAllPaginated = async (query, page = 1, size = 10) => {
        let limit = size;
        let offset = size * (page - 1)
        try {
            let message = 'success get all data';
            let projects = await this.projectDao.getDataTableData(query, limit, offset);
            let data = responseHandler.getPaginationData(projects, page, size);
            return responseHandler.returnSuccess(httpStatus.OK, message, data);
        } catch (error) {
            logger.error(error);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something Wrong');
        }
    }

    getAll = async (query) => {
        try {
            let message = 'success get all data';
            let projects = await this.projectDao.findByWhere(query, ['name', 'asc']);
            return responseHandler.returnSuccess(httpStatus.OK, message, projects);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, e)
        }

    }
    findById = async (id) => {
        try {
            let message = `success get data by id ${id}`;
            let data = await this.projectDao.findById(id);
            return responseHandler.returnSuccess(httpStatus.OK, message, data);

        } catch (error) {
            logger.error(error);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something Wrong');

        }
    }

    delete = async (id) => {
        try {
            let message = 'success delete data';
            await this.projectDao.deleteByWhere({ id: id });
            return responseHandler.returnSuccess(httpStatus.OK, message, null)

        } catch (error) {
            logger.error(error);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something Wrong');

        }
    }

    update = async (id, data) => {
        try {
            let message = 'success update data';
            await this.projectDao.updateById(data, id);
            return responseHandler.returnSuccess(httpStatus.OK, message);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, e)

        }
    }
}

module.exports = ProjectService;