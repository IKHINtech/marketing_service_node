const SuperDao = require("./superDao");

const models = require('../models');
const SubProjectImage = models.sub_project_image;

class SubProjectImageDao extends SuperDao {
    constructor() {
        super(SubProjectImage);
    }

}

module.exports = SubProjectImageDao;