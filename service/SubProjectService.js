const SubProjectDao = require("../dao/subProjectDao");
const httpStatus = require("http-status");
const { v4: uuidv4 } = require('uuid');
const logger = require("../config/logger");
const responseHandler = require('../helper/responseHandler');



class SubProjectService {
    constructor() {
        this.subProjectDao = new SubProjectDao();
    }

    create = async (subProjectBody) => {
        try {
            let message = 'success create sub project';
            if (await this.subProjectDao.findByName(subProjectBody.name)) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Nama Sub Project Sudah Ada');
            }
            const uuid = uuidv4()
            subProjectBody.name = subProjectBody.name;
            subProjectBody.id = uuid;
            subProjectBody.code = subProjectBody.code;

            let subProjectData = await this.subProjectDao.create(subProjectBody);
            if (!subProjectData) {
                message = 'Failed Create Sub Project';
                return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
            }
            subProjectData = subProjectData.toJSON();

            return responseHandler.returnSuccess(httpStatus.CREATED, message, subProjectData);

        } catch (e) {
            logger.log(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something wrong');

        }
    }
    getPaginated = async (query, page = 1, size = 10) => {
        let limit = size;
        let offset = size * (page - 1);

        try {
            let message = 'succes get paginated data';
            const subProjects = await this.subProjectDao.getDataTableData(query, limit, offset);
            const data = responseHandler.getPaginationData(subProjects, page, size);
            return responseHandler.returnSuccess(httpStatus.OK, message, data);
        } catch (e) {
            logger.log(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, e)
        }
    }
    getAll = async (query) => {
        try {
            let message = 'succes get all data';
            const subProjects = await this.subProjectDao.findByWhere(query, ['name', 'asc']);
            return responseHandler.returnSuccess(httpStatus.OK, message, subProjects);

        } catch (e) {
            logger.log(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, e);
        }
    }
    findById = async (id) => {
        try {
            const message = 'success get data';
            const subProject = await this.subProjectDao.findById(id);
            return responseHandler.returnSuccess(httpStatus.OK, message, subProject);

        } catch (e) {
            logger.log(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, e)
        }
    }

    update = async (id, data) => {
        try {
            const message = 'success update data';
            await this.subProjectDao.updateById(data, id);
            return responseHandler.returnSuccess(httpStatus.OK, message)
        } catch (e) {
            logger.log(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, e);
        }
    }
}

module.exports = SubProjectService