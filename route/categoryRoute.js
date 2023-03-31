const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const auth = require("../middlewares/auth");
const CategoryValidator = require("../validator/category.validator");

const router = express.Router();
const categoryController = new CategoryController();
const categoryValidator = new CategoryValidator();

router.get("/", auth(), categoryController.getAllPaginated)
router.post("/", auth(), categoryValidator.categoryCreateValidator, categoryController.create)
router.get("/:id", auth(), categoryController.getById)

module.exports = router;