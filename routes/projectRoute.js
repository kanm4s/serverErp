const express = require("express");
const projectController = require("../controllers/projectController");

const router = express.Router();

router.get("/", projectController.getAllProject);
router.get("/:projectId", projectController.getProjectId);
router.get("/tasks", projectController.getAllTask);
router.get("/tasks/:id", projectController.getTaskById);
router.get(
  "/:projectId/tasks",
  projectController.getProjectById,
  projectController.getTasksByProjectId
);
router.post("/createProject", projectController.createProject);
router.patch("/:projectId", projectController.editProjectById);
router.post(
  "/createTask/:projectId",
  projectController.getProjectById,
  projectController.createTask
);
router.patch("/tasks/:id", projectController.editTaskById);
router.post("/tasks/delegate", projectController.delegateTaskToId);

module.exports = router;
