module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastUpdatePassword: {
        type: DataTypes.DATE,
      },
      birthDate: {
        type: DataTypes.DATEONLY,
      },
      address: {
        type: DataTypes.STRING,
      },
      position: {
        type: DataTypes.STRING,
        defaultValue: "Junior",
      },
      phoneNumber: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
      },
      team: {
        type: DataTypes.STRING,
      },
      profileImage: {
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
    }
  );

  // link to EmailBox
  // User.associate = (models) => {

  // };

  // link to chatlog
  // User.associate = (models) => {

  // };

  // link to project-owner
  User.associate = (models) => {
    User.hasMany(models.EmailBox, {
      as: "senderEmailBox",
      foreignKey: {
        allowNull: false,
        name: "senderId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    User.hasMany(models.EmailBox, {
      as: "receiverEmailBox",
      foreignKey: {
        allowNull: false,
        name: "receiverId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    User.hasMany(models.ChatLog, {
      as: "senderChatLog",
      foreignKey: {
        allowNull: false,
        name: "senderId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    User.hasMany(models.ChatLog, {
      as: "receiverChatLog",
      foreignKey: {
        allowNull: false,
        name: "receiverId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    User.hasMany(models.ProjectOwner, {
      foreignKey: {
        allowNull: false,
        name: "userId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    User.hasMany(models.TaskOwner, {
      as: "receiverTaskOwner",
      foreignKey: {
        allowNull: false,
        name: "receiverId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    User.hasMany(models.TaskOwner, {
      as: "senderTaskOwner",
      foreignKey: {
        allowNull: false,
        name: "senderId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    User.hasMany(models.GoodjobNote, {
      as: "senderGoodjobNote",
      foreignKey: {
        allowNull: false,
        name: "senderId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    User.hasMany(models.GoodjobNote, {
      as: "receiverGoodjobNote",
      foreignKey: {
        allowNull: false,
        name: "receiverId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  // link to task-owner
  // User.associate = (models) => {

  // };

  // link to Goodjob note
  // User.associate = (models) => {

  // };
  // User.associate = (models) => {

  // };

  return User;
};
