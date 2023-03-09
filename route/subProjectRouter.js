const express = require("express");
const SubProjectController = require("../controllers/SubProjectController");
const auth = require("../middlewares/auth");
const SubProjectValidator = require("../validator/subProject.validator");


const router = express.Router();
const subProjectController = new SubProjectController();
const subProjectValidator = new SubProjectValidator();


router.get('/', auth(), subProjectController.getAllPaginated);
router.post('/', auth(), subProjectValidator.subProjectCreateValidator, subProjectController.create);
router.get('/no_page', auth(), subProjectController.getAll);
router.get('/:id', auth(), subProjectController.getById)
router.delete('/:id', auth(), subProjectController.delete)
router.put('/:id', auth(), subProjectValidator.subProjectCreateValidator, subProjectController.update)

module.exports = router;