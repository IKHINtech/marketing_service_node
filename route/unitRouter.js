const express = require("express");
const UnitValidator = require("../validator/level.validator");
const UnitController = require("../controllers/UnitController");
const auth = require("../middlewares/auth");

const router = express.Router();
const unitController = new UnitController();
const unitValidator = new UnitValidator();

router.get("/", auth(), unitController.getAllPaginated);
router.post(
  "/",
  auth(),
  unitValidator.levelCreateValidator,
  unitController.create
);
router.get("/:id", auth(), unitController.getById);

module.exports = router;
