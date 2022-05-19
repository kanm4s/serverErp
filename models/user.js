module.export = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
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
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            phoneNumber: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
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

    return Employee;
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
