module.exports = (sequelize, DataTypes) => {
  const TaskOwner = sequelize.define("TaskOwner", {});

  TaskOwner.associate = (models) => {
    TaskOwner.belongsTo(models.Task, {
      foreignKey: {
        allowNull: false,
        name: "projectId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  TaskOwner.associate = (models) => {
    TaskOwner.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        name: "userId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return TaskOwner;
};
