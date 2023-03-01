const express = require('express');
const ProjectValidator = require('../validator/project.validator');
const ProjectController = require('../controllers/ProjectController');
const auth = require('../middlewares/auth');




const router = express.Router();
const projectValidator = new ProjectValidator();
const projectController = new ProjectController();

router.route('/').get(auth(), projectController.getAllPaginated).post(auth(), projectValidator.projectCreateValidator, projectController.create);
router.get('/:id', auth(), projectController.getbyId);
router.delete('/:id', auth(), projectController.delete)


module.exports = router;