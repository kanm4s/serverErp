module.export = (sequelize, DataTypes) => {
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
    };

    return Project;
};
