module.exports = (sequelize, DataTypes) => {
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
    GoodjobNote.belongsTo(models.User, {
      as: "senderGoodjobNote",
      foreignKey: {
        allowNull: false,
        name: "senderId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    GoodjobNote.belongsTo(models.User, {
      as: "receiverGoodjobNote",
      foreignKey: {
        allowNull: false,
        name: "receiverId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  // GoodjobNote.associate = (models) => {};

  return GoodjobNote;
};
