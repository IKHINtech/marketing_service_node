const SubProjectAdditionalInfoDao = require("../dao/subProjectAdditionalInfoDao");
const httpStatus = require("http-status");
const { v4: uuidv4 } = require("uuid");

const responseHandler = require('../helper/responseHandler');

class SubProjectAdditionalInfoService {
    constructor() {
        this.dao = new SubProjectAdditionalInfoDao();
    }

    create = async (data) => {
        try {

            let msg = 'success create data';
            const uuid = uuidv4();
            data.id = uuid;
            data.key = data.key;
            data.value = data.value;
            data.sub_project_id = data.sub_project_id;


            let result = await this.dao.create(data);
            if (!result) {
                msg = 'failed to create data';
                return responseHandler.returnError(httpStatus.BAD_REQUEST, msg);
            }
            result = result.toJSON();
            return responseHandler.returnSuccess(httpStatus.CREATED, msg, result);
        } catch (e) {
            logger.log(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, e);


        }

    }
    update = async (id, data) => {
        try {
            const msg = 'success update data';
            await this.dao.updateById(data, id);
            responseHandler.returnSuccess(httpStatus.OK, msg);

        } catch (e) {
            logger.log(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, e);


        }
    }
}

module.exports = SubProjectAdditionalInfoService;