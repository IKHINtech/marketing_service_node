const SuperDao = require('./superDao');
const models = require('../models')
const SubProject = models.sub_project;

class SubProjectDao extends SuperDao {
    constructor() {
        super(SubProject)
    }
    async findByName(name) {
        return SubProject.findOne({ where: { name } });

    }
    async isNameExists(name) {
        return SubProject.count({
            where: { name }
        }).then((count) => {
            if (count != 0) {
                return true;
            } else {
                return false;
            }
        })
    }
}

module.exports = SubProjectDao