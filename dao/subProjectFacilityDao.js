const SuperDao = require("./superDao");

const models = require('../models');
const SubProjectFacility = models.sub_project_facility;

class SubProjectFacilityDao extends SuperDao {
    constructor() {
        super(SubProjectFacility);
    }

}

module.exports = SubProjectFacilityDao;