module.exports = (sequelize, DataTypes) => {
  const TaskOwner = sequelize.define("TaskOwner", {});

  // TaskOwner.associate = (models) => {
  //   TaskOwner.belongsTo(models.Task, {
  //     foreignKey: {
  //       allowNull: false,
  //       name: "taskId",
  //     },
  //     onDelete: "RESTRICT",
  //     onUpdate: "RESTRICT",
  //   });
  // };

  TaskOwner.associate = (models) => {
    TaskOwner.belongsTo(models.Task, {
      foreignKey: {
        allowNull: false,
        name: "taskId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    TaskOwner.belongsTo(models.User, {
      as: "receiverTaskOwner",
      foreignKey: {
        name: "receiverId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    TaskOwner.belongsTo(models.User, {
      as: "senderTaskOwner",
      foreignKey: {
        allowNull: false,
        name: "senderId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return TaskOwner;
};
