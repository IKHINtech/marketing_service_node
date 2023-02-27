const SuperDao = require('./superDao');

const models = require('../models');

const Project = models.project;

class ProjectDao extends SuperDao {
    constructor() {
        super(Project)
    }
    async findByName(name) {
        return Project.findOne({ where: { name } });
    }
    async isNameExists(name) {
        return Project.count({
            where: { name }
        }).then((count) => {
            if (count != 0) {
                return true
            } else {
                return false
            }
        })
    }

}

module.exports = ProjectDao;