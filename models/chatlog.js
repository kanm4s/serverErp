module.export = (sequelize, DataTypes) => {
    const ChatLog = sequelize.define(
        "ChatLog",
        {
            chat: {
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

    ChatLog.associate = (models) => {
        ChatLog.belongTo(models.User, {
            foreignKey: {
                allowNull: false,
                name: "senderId",
            },
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT",
        });
    };

    ChatLog.associate = (models) => {
        ChatLog.belongTo(models.User, {
            foreignKey: {
                allowNull: false,
                name: "receiverId",
            },
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT",
        });
    };

    return ChatLog;
};
