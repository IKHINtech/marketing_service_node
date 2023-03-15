const SuperDao = require("./superDao");

const models = require('../models');
const Level = models.level;

class LevelDao extends SuperDao {
    constructor() {
        super(Level);
    }

}

module.exports = LevelDao;