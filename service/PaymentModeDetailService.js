const httpStatus = require("http-status");
const { v4: uuidv4 } = require("uuid");
const PaymentModeDetailDao = require("../dao/paymentModeDetailDao");
const responseHandler = require("../helper/responseHandler");

class PaymentModeDetailService {
  constructor() {
    this.dao = new PaymentModeDetailDao();
  }

  create = async (data) => {
    try {
      let msg = "success create data";
      const uuid = uuidv4();
      data.id = uuid;
      data.key = data.key;
      data.value = data.value;
      data.priorityas = data.priorityas;
      data.payment_mode_id = data.payment_mode_id;

      let result = await this.dao.create(data);
      if (!result) {
        msg = "failed create data";
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
      return responseHandler.returnSuccess(httpStatus.OK, msg);
    } catch (e) {
      logger.log(e);
      return responseHandler.returnError(httpStatus.BAD_REQUEST, e);
    }
  };
}

module.exports = PaymentModeDetailService;
