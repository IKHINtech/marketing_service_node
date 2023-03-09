const express = require('express');
const ProjectValidator = require('../validator/project.validator');
const ProjectController = require('../controllers/ProjectController');
const auth = require('../middlewares/auth');




const router = express.Router();
const projectValidator = new ProjectValidator();
const projectController = new ProjectController();

router.get('/', auth(), projectController.getAllPaginated)
router.post('/', auth(), projectValidator.projectCreateValidator, projectController.create);
router.get('/no_page', auth(), projectController.getAll)
router.get('/:id', auth(), projectController.getbyId);
router.delete('/:id', auth(), projectController.delete)
router.put('/:id', auth(), projectValidator.projectCreateValidator, projectController.update)

module.exports = router;