module.export = (sequelize, DataTypes) => {
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
            workingStatus: {
                type: DataTypes.ENUM,
                values: ["active", "waiting", "done"],
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            priority: {
                type: DataTypes.ENUM,
                values: ["high", "normal", "low"],
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
        },
        {
            underscored: true,
        }
    );

    Task.associate = (models) => {
        Task.belongTo(models.Project, {
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
