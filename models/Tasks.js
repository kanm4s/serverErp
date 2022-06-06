module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

      deadLine: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      brief: {
        type: DataTypes.STRING,
      },
      noteDetail: {
        type: DataTypes.STRING,
      },
      workingStatus: {
        type: DataTypes.ENUM,
        values: ["active", "waiting", "done"],
        defaultValue: "waiting",
      },
      priority: {
        type: DataTypes.ENUM,
        values: ["high", "normal", "low"],
        defaultValue: "normal",
      },
    },
    {
      underscored: true,
    }
  );

  Task.associate = (models) => {
    Task.belongsTo(models.Project, {
      foreignKey: {
        allowNull: false,
        name: "projectId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    Task.hasMany(models.TaskOwner, {
      foreignKey: {
        allowNull: false,
        name: "taskId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  // Task.associate = (models) => {

  // };

  return Task;
};
