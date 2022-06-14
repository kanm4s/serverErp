module.exports = (sequelize, DataTypes) => {
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
    EmailBox.belongsTo(models.User, {
      as: "senderEmailBox",
      foreignKey: {
        allowNull: false,
        name: "senderId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    EmailBox.belongsTo(models.User, {
      as: "receiverEmailBox",
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
