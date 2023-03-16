const LevelService = require('../service/LevelService');
const logger = require('../config/logger');
const httpStatus = require('http-status');

class LevelController {
    constructor() {
        this.service = new LevelService();
    }

    create = async (req, res) => {
        // TODO

    }

}