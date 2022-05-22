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
    },
    {
      underscored: true,
    }
  );

  // link to EmailBox
  User.associate = (models) => {
    User.hasMany(models.EmailBox, {
      foreignKey: {
        allowNull: false,
        name: "senderId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };
  User.associate = (models) => {
    User.hasMany(models.EmailBox, {
      foreignKey: {
        allowNull: false,
        name: "receiverId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  // link to chatlog
  User.associate = (models) => {
    User.hasMany(models.ChatLog, {
      foreignKey: {
        allowNull: false,
        name: "senderId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };
  User.associate = (models) => {
    User.hasMany(models.ChatLog, {
      foreignKey: {
        allowNull: false,
        name: "receiverId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  // link to project-owner
  User.associate = (models) => {
    User.hasMany(models.ProjectOwner, {
      foreignKey: {
        allowNull: false,
        name: "userId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  // link to task-owner
  User.associate = (models) => {
    User.hasMany(models.TaskOwner, {
      foreignKey: {
        allowNull: false,
        name: "userId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  // link to Goodjob note
  User.associate = (models) => {
    User.hasMany(models.GoodjobNote, {
      foreignKey: {
        allowNull: false,
        name: "senderId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };
  User.associate = (models) => {
    User.hasMany(models.GoodjobNote, {
      foreignKey: {
        allowNull: false,
        name: "receiverId",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return User;
};
