const PaymentModeDao = require("../dao/paymentModeDao");
const httpStatus = require("http-status");
const { v4: uuidv4 } = require("uuid");

const responseHandler = require("../helper/responseHandler");

class PaymentModeService {
  constructor() {
    this.dao = new PaymentModeDao();
  }

  create = async (data) => {
    try {
      let msg = "success create data";
      const uuid = uuidv4();
      data.id = uuid;
      data.start_at = data.start_at;
      data.is_active = data.is_active;
      data.key = data.key;
      data.value = data.value;
      data.prioritas = data.prioritas;
      data.type_id = data.type_id;

      let result = await this.dao.create(data);
      if (!result) {
        msg = "failed to create data";
        return responseHandler.returnError(httpStatus.BAD_REQUEST, msg);
      }
      result = result.toJSON();
      return responseHandler.returnSuccess(httpStatus.CREATED, msg, result);
    } catch (e) {
      logger.log(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, e);
    }
  };
  update = async (id, data) => {
    try {
      const msg = "success update data";
      await this.dao.updateById(data, id);
      responseHandler.returnSuccess(httpStatus.OK, msg);
    } catch (e) {
      logger.log(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, e);
    }
  };
}

module.exports = PaymentModeService;
