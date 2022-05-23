const express = require("express");
const projectController = require("../controllers/projectController");

const router = express.Router();

router.get("/", projectController.getAllProject);
router.get("/tasks", projectController.getAllTask);
router.post("/createProject", projectController.createProject);
router.post(
  "/createTask",
  projectController.getProjectById,
  projectController.createTask
);

module.exports = router;
