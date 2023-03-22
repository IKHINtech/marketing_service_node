const SuperDao = require("./superDao");
const models = require("../models");
const PaymentModoDetail = models.payment_mode_detail;

class PaymentModeDetailDao extends SuperDao {
  constructor() {
    super(PaymentModoDetail);
  }
}

module.exports = PaymentModeDetailDao;
