const SuperDao = require('./superDao');
const models = require('../models');
const PaymentMode = models.payment_mode;

class PaymentModeDao extends SuperDao {
    constructor() {
        super(PaymentMode);
    }


}

module.exports = PaymentModeDao;