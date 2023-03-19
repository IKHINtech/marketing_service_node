const LevelService = require('../service/LevelService');
const logger = require('../config/logger');
const httpStatus = require('http-status');

class LevelController {
    constructor() {
        this.service = new LevelService();
    }

    create = async (req, res) => {
        try {
            const data = await this.service.create(req.body);
            const { status } = data.response;
            const { msg, result } = data.response;
            res.status(data.statusCode).send({ status, msg, result });
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);

        }

    }
    getById = async (req, res) => {
        try {
            const data = await this.service.findById(req.params.id);
            res.status(data.statusCode).send(data.response);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);

        }
    }

    getAllPaginated = async (req, res) => {

        try {
            let page = 1;
            let size = 10;
            if ('page' in req.query && req.query['page'] != '') {
                page = parseInt(req.query['page'], 10);
            }
            if ('size' in req.query && req.query['page'] != '') {
                size = parseInt(req.query['page'], 10)
            }
            let query = {};
            const data = await this.service.getPaginated(query, page, size);
            res.status(data.statusCode).send(data.response);

        } catch (e) {

            logger.log(e);
            res.status(data.statusCode).send(data.response);
        }
    }

    getAll = async (req, res) => {
        try {
            const data = await this.service.getAll({});
            res.status(data.statusCode).send(data.response);

        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);

        }

    }

    update = async (req, res) => {
        try {
            const data = await this.service.update

        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);

        }
    }

}

module.exports = LevelController;