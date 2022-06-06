const validator = require("validator");
const createError = require("../utils/createError");
const { Task, ProjectOwner, Project, TaskOwner } = require("../models");

exports.getAllProject = async (req, res, next) => {
  try {
    const allProject = await Project.findAll();
    res.json({ allProject: allProject });
  } catch (err) {
    next(err);
  }
};

exports.getProjectId = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    console.log(projectId);
    const project = await Project.findOne({ where: { id: projectId } });
    res.json({ project });
  } catch (err) {
    next(err);
  }
};

exports.getAllTask = async (req, res, next) => {
  try {
    const allTask = await Task.findAll();
    res.json({ allTask: allTask });
  } catch (err) {
    next(err);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id } });
    res.json({ task });
  } catch (err) {
    next(err);
  }
};

exports.createProject = async (req, res, next) => {
  const { id } = req.user;
  try {
    const { name, clientName, deadLine, brief } = req.body;
    if (validator.isEmpty(name + "")) {
      createError("project name is required");
    }
    if (validator.isEmpty(clientName + "")) {
      createError("client name is required");
    }
    if (validator.isEmpty(deadLine + "")) {
      createError("deadLine is required");
    }

    const result = await Project.create({ name, clientName, deadLine, brief });
    const result_project_owner = await ProjectOwner.create({
      projectId: result.id,
      userId: id,
    });

    res.json({
      message: "Create project done",
      project: result,
      project_owner: result_project_owner,
    });
  } catch (err) {
    next(err);
  }
};

exports.editProjectById = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { name, clientName, deadLine, brief } = req.body;

    if (validator.isEmpty(projectId + "")) {
      createError("projectId is required");
    }

    const result = await Project.update(
      { name, clientName, deadLine, brief },
      { where: { id: projectId } }
    );

    res.json({ message: "Update completed" });
  } catch (err) {
    next(err);
  }
};

exports.getTasksByProjectId = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const task = await Task.findAll({
      where: { projectId },
      include: { model: Project, where: { id: projectId } },
    });
    const projectOwner = await ProjectOwner.findAll({ where: { projectId } });
    // task.ProjectOwner = projectOwner;
    res.json({ tasks: task });
  } catch (err) {
    next(err);
  }
};

exports.getProjectById = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    if (validator.isEmpty(projectId + "")) {
      createError("projectId is required");
    }

    const project = await Project.findOne({ where: { id: projectId } });

    if (!project) {
      createError("project is not found with this id");
    }

    next();
  } catch (err) {
    next(err);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const {
      name,
      deadLine,
      type,
      brief,
      noteDetail,
      workingStatus = "waiting",
      priority = "normal",
    } = req.body;

    const { projectId } = req.params;

    if (validator.isEmpty(name + "")) {
      createError("project name is required");
    }
    if (validator.isEmpty(type + "")) {
      createError("Type is required");
    }
    if (validator.isEmpty(deadLine + "")) {
      createError("deadLine is required");
    }

    const result = await Task.create({
      name,
      deadLine,
      type,
      brief,
      noteDetail,
      workingStatus,
      priority,
      projectId,
    });

    res.json({ message: "Create tasks done", Task: result });
  } catch (err) {
    next(err);
  }
};

exports.editTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, type, deadLine, brief } = req.body;
    const task = await Task.update(
      { name, type, brief, deadLine },
      { where: { id } }
    );
    res.json({ message: `update task id number ${task} done` });
  } catch (err) {
    next(err);
  }
};

exports.delegateTaskToId = async (req, res, next) => {
  try {
    const { receiverId, taskId } = req.body;
    const { id } = req.user;

    const findExisted = await TaskOwner.findOne({ where: { taskId } });

    if (findExisted) {
      const taskToIdUpdate = await TaskOwner.update(
        { receiverId },
        { where: { taskId } }
      );
      res.json({ message: "Update delegate done", taskToIdUpdate });
    } else {
      const taskToId = await TaskOwner.create({
        taskId,
        receiverId,
        senderId: id,
      });
      res.json({ message: "Delegate done", taskToId });
    }
  } catch (err) {
    next(err);
  }
};
