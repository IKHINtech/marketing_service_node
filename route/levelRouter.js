const express = require("express");
const LevelValidator = require("../validator/level.validator");
const LevelController = require("../controllers/LevelController");
const auth = require("../middlewares/auth");

const router = express.Router();
const levelValidator = new LevelValidator();
const levelController = new LevelController();

router.get("/", auth(), levelController.getAllPaginated);
router.post(
  "/",
  auth(),
  levelValidator.levelCreateValidator,
  levelController.create
);
router.get("/:id", auth(), levelController.getById);

module.exports = router;
