const express = require("express");
const SubCategoryController = require("../controllers/SubCategoryController");
const auth = require("../middlewares/auth");
const SubCategoryValidator = require("../validator/subCategory.validator");

const router = express.Router();
const subCategoryValidator = new SubCategoryValidator();
const subcategoryController = new SubCategoryController();

router.get("/", auth(), subcategoryController.getAllPaginated)
router.post("/", auth(), subCategoryValidator.subCategoryCreateValidator, subcategoryController.create)
router.get("/:id", auth(), subcategoryController.getById)

module.exports = router;