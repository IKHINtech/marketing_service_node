const SuperDao = require("./superDao");
const models = require("../models");

const Worker = models.worker;

class UserDao extends SuperDao {
  constructor() {
    super(Worker);
  }

  async findByEmail(email) {
    return Worker.findOne({ where: { email } });
  }

  async isEmailExists(email) {
    return Worker.count({ where: { email } }).then((count) => {
      if (count != 0) {
        return true;
      }
      return false;
    });
  }

  async createWithTransaction(worker, transaction) {
    return Worker.create(worker, { transaction });
  }
}

module.exports = UserDao;
