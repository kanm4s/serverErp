module.export = (sequelize, DataTypes) => {
    const ProjectOwner = sequelize.define("ProjectOwner", {});

    ProjectOwner.associate = (models) => {
        ProjectOwner.belongTo(models.Project, {
            foreignKey: {
                allowNull: false,
                name: "projectId",
            },
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT",
        });
    };

    ProjectOwner.associate = (models) => {
        ProjectOwner.belongTo(models.User, {
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
