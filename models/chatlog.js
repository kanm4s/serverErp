module.exports = (sequelize, DataTypes) => {
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
    ChatLog.belongsTo(models.User, {
      as: "senderChatLog",
      foreignKey: {
        allowNull: false,
        name: "senderId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    ChatLog.belongsTo(models.User, {
      as: "receiverChatLog",
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
