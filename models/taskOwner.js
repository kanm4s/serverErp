module.export = (sequelize, DataTypes) => {
  const TaskOwner = sequelize.define("TaskOwner", {});

  TaskOwner.associate = (models) => {
    TaskOwner.belongTo(models.Task, {
      foreignKey: {
        allowNull: false,
        name: "projectId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  TaskOwner.associate = (models) => {
    TaskOwner.belongTo(models.User, {
      foreignKey: {
        allowNull: false,
        name: "userId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return ProjectOwner;
};
