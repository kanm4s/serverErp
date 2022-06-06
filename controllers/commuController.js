const validator = require("validator");
const createError = require("../utils/createError");
const { User, EmailBox, Sequelize } = require("../models");

exports.createEmail = async (req, res, next) => {
  try {
    const { emailAddress, subject, content } = req.body;
    const { id } = req.user;

    const findUserId = await User.findOne({ where: { email: emailAddress } });

    if (validator.isEmpty(findUserId + "")) {
      createError("Email not found", 400);
    }

    const email = await EmailBox.create({
      subject,
      content,
      senderId: id,
      receiverId: findUserId.id,
    });

    res.json({ email });
  } catch (err) {
    next(err);
  }
};

exports.deleteEmailById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await EmailBox.destroy({ where: { id } });
    res.json({ message: "Delete success" });
  } catch (err) {
    next(err);
  }
};

exports.getEmailsByUserId = async (req, res, next) => {
  try {
    const { id } = req.user;
    const emails = await EmailBox.findAll({
      where: { receiverId: id },
      include: [
        {
          model: User,
          as: "receiver",
        },
        {
          model: User,
          as: "sender",
        },
      ],
    });

    res.json({ emails });
  } catch (err) {
    next(err);
  }
};
