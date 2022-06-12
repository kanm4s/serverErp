module.exports = (sequelize, DataTypes) => {
  const PostIt = sequelize.define(
    "PostIt",
    {
      content: {
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
    }
  );

  PostIt.associate = (models) => {
    PostIt.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        name: "ownerId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return PostIt;
};
