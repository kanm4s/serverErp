const validator = require("validator");
const createError = require("../utils/createError");
const { Task, ProjectOwner, Project } = require("../models");

exports.getAllProject = async (req, res, next) => {
  try {
    const allProject = await Project.findAll();
    res.json({ allProject: allProject });
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

exports.getProjectById = async (req, res, next) => {
  try {
    const { projectId } = req.body;

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
      projectId,
    } = req.body;
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

    res.json({ message: "Create tasks done", project: result });
  } catch (err) {
    next(err);
  }
};
