const httpStatus = require("http-status");
const logger = require("../config/logger");
const UnitDao = require("../dao/unitDao");
const responseHandler = require('../helper/responseHandler');
const { v4: uuidv4 } = require('uuid');
const { query } = require("express");

class UnitService {
    constructor() {
        this.repo = new UnitDao();
    }
    create = async (data) => {
        try {
            let msg = 'success create unit data';
            const uuid = uuidv4();
            data.id = uuid;
            data.code = data.code;
            data.name = data.name;
            data.status = data.status;
            data.level_id = data.level_id;
            data.type_id = data.type_id;

            let unit = await this.repo.create(data);
            if (!unit) {
                msg = 'failed to create unit data';
                return responseHandler.returnError(httpStatus.BAD_REQUEST, msg);

            }
            unit = unit.toJSON();

            return responseHandler.returnSuccess(httpStatus.CREATED, msg, unit);

        } catch (e) {
            logger.log(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, e);
        }
    }
    getPaginated = async (query, page = 1, size = 10) => {
        let limit = size;
        let offset = size * (page - 1);
        try {
            let msg = 'success get paginated data';
            const data = await this.repo.getDataTableData(query, limit, offset);
            const result = responseHandler.getPaginationData(data, page, size);
            return responseHandler.returnSuccess(httpStatus.OK, msg, result);

        } catch (e) {
            logger.log(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, e);
        }
    }

    getAll = async (query) => {
        try {
            let msg = 'success get all data';
            const data = await this.repo.findByWhere(query, ['name', 'asc']);

            return responseHandler.returnSuccess(httpStatus.OK, msg, data);
        } catch (e) {
            logger.log(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, e);

        }
    }

    findById = async (id) => {
        try {
            const msg = 'success get by id';
            const data = await this.repo.findById(id);
            return responseHandler.returnSuccess(httpStatus.OK, msg, data)

        } catch (e) {
            logger.log(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, e);


        }
    }

    update = async (id, data) => {
        try {
            const msg = 'success update data';
            await this.repo.updateById(data, id);
            return responseHandler.returnSuccess(httpStatus.OK, msg);
        } catch (e) {
            logger.log(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, e);


        }
    }
}

module.exports = UnitService;