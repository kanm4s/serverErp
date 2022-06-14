const express = require("express");
const projectController = require("../controllers/projectController");

const router = express.Router();

router.get("/", projectController.getAllProject);
router.get("/tasks", projectController.getAllTask);
router.get("/tasks/getTaskByUserId", projectController.getTaskReceiverByUserId);
router.get("/tasks/getAvailableTasks", projectController.getAvailableTasks);

router.get("/getProjectProgress", projectController.getProjectProgress);
router.get("/getAllWorkingTasks", projectController.getAllWorkingTasks);
router.get("/tasks/:id", projectController.getTaskById);
router.get(
  "/:projectId/tasks",
  projectController.getProjectById,
  projectController.getTasksByProjectId
);
router.post("/createProject", projectController.createProject);
router.get("/:projectId", projectController.getProjectId);
router.patch("/:projectId", projectController.editProjectById);
router.post(
  "/createTask/:projectId",
  projectController.getProjectById,
  projectController.createTask
);
router.patch("/tasks/:id", projectController.editTaskById);
router.patch(
  "/tasks/wokingStatus/:id",
  projectController.editTaskWorkingStatusById
);
router.post("/tasks/delegate", projectController.delegateTaskToId);

module.exports = router;
