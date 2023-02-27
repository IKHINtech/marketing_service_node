const express = require('express');
const ProjectValidator = require('../validator/project.validator');
const ProjectController = require('../controllers/ProjectController');



const router = express.Router();
const projectValidator = new ProjectValidator();
const projectController = new ProjectController();

router.post('', projectValidator.projectCreateValidator, projectController.create);

module.exports = router;