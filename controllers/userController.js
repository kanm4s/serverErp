const { User, TaskOwner, Task } = require("../models");

exports.getMe = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findOne({
      where: id,
      attributes: {
        exclude: ["password", "lastUpdatePassword", "createdAt", "updatedAt"],
      },
    });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

exports.getAllUser = async (req, res, next) => {
  try {
    const Users = await User.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });
    res.json({ Users });
  } catch (err) {
    next(err);
  }
};

exports.getAvailableUser = async (req, res, next) => {
  try {
    const Users = await User.findAll({ attributes: ["id", "firstName"] });
    const resultUser = JSON.parse(JSON.stringify(Users));
    const Tasks = await Task.findAll({
      where: { workingStatus: "active" },
      include: {
        model: TaskOwner,
        attributes: ["receiverId"],
      },
    });

    const user = [...resultUser];

    const resultTasks = JSON.parse(JSON.stringify(Tasks));

    resultUser.forEach((ele) => {
      resultTasks.forEach((task) => {
        const id = task.TaskOwners[0].receiverId;
        if (id === ele.id) {
          const idx = user.findIndex((user) => user.id === ele.id);
          if (idx) {
            user.splice(idx, 1);
          }
        }
      });
    });

    res.json({ user });
  } catch (err) {
    next(err);
  }
};
