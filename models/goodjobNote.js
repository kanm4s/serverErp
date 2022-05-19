module.export = (sequelize, DataTypes) => {
    const GoodjobNote = sequelize.define(
        "GoodjobNote",
        {
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

    GoodjobNote.associate = (models) => {
        GoodjobNote.belongTo(models.User, {
            foreignKey: {
                allowNull: false,
                name: "senderId",
            },
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT",
        });
    };

    GoodjobNote.associate = (models) => {
        GoodjobNote.belongTo(models.User, {
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
