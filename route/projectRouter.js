const express = require('express');
const ProjectValidator = require('../validator/project.validator');
const ProjectController = require('../controllers/ProjectController');
const auth = require('../middlewares/auth');




const router = express.Router();
const projectValidator = new ProjectValidator();
const projectController = new ProjectController();

router.post('', auth(), projectValidator.projectCreateValidator, projectController.create);

module.exports = router;