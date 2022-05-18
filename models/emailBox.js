module.export = (sequelize, DataTypes) => {
    const EmailBox = sequelize.define(
        "EmailBox",
        {
            subject: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            content: {
                type: DataTypes.STRING,
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

    EmailBox.associate = (models) => {
        EmailBox.belongTo(models.User, {
            foreignKey: {
                allowNull: false,
                name: "senderId",
            },
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT",
        });
    };

    EmailBox.associate = (models) => {
        EmailBox.belongTo(models.User, {
            foreignKey: {
                allowNull: false,
                name: "receiverId",
            },
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT",
        });
    };

    return EmailBox;
};
