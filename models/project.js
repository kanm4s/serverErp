module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "Project",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      clientName: {
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
      brief: {
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
    }
  );

  Project.associate = (models) => {
    Project.hasMany(models.ProjectOwner, {
      foreignKey: {
        allowNull: false,
        name: "projectId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    Project.hasMany(models.Task, {
      foreignKey: {
        allowNull: false,
        name: "projectId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  // Project.associate = (models) => {

  // };

  return Project;
};
