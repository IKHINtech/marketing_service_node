const SuperDao = require("./superDao");

const models = require("../models");
const SubProjectAdditionalInfo = models.sub_project_additional_info;

class SubProjectAdditionalInfoDao extends SuperDao {
  constructor() {
    super(SubProjectAdditionalInfo);
  }
}

module.exports = SubProjectAdditionalInfoDao;
