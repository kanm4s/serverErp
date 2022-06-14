const createError = require("../utils/createError");
const { User, EmailBox, ChatLog, PostIt, RoomChat } = require("../models");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

exports.createEmail = async (req, res, next) => {
  try {
    const { emailAddress, subject, content } = req.body;
    const { id } = req.user;

    const findUserId = await User.findOne({ where: { email: emailAddress } });
    console.log(findUserId, "test createEmail");
    if (findUserId === null) {
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
          as: "receiverEmailBox",
        },
        {
          model: User,
          as: "senderEmailBox",
        },
      ],
    });

    res.json({ emails });
  } catch (err) {
    next(err);
  }
};

exports.sendMessage = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { receiverId } = req.params;
    const { content } = req.body;

    const message = await ChatLog.create({
      chat: content,
      senderId: id,
      receiverId,
    });

    res.json({ message });
  } catch (err) {
    next(err);
  }
};

exports.getMessageById = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { receiverId } = req.params;

    const allMessage = await ChatLog.findAll({
      where: {
        [Op.or]: [
          { senderId: id, receiverId },
          { senderId: receiverId, receiverId: id },
        ],
      },
      attributes: ["id", "chat", "senderId", "receiverId", "createdAt"],
      order: [["createdAt", "DESC"]],
      include: [
        { model: User, as: "senderChatLog", attributes: ["firstName"] },
        { model: User, as: "receiverChatLog", attributes: ["firstName"] },
      ],
    });
    res.json({ allMessage });
  } catch (err) {
    next(err);
  }
};

exports.createPostIt = async (req, res, next) => {
  try {
    const { id } = req.user;
    const postIt = await PostIt.create({ ownerId: id });
    res.json({ postIt });
  } catch (err) {
    next(err);
  }
};

exports.getAllPostIt = async (req, res, next) => {
  try {
    const { id } = req.user;

    const allPostIt = await PostIt.findAll({ where: { ownerId: id } });
    res.json({ allPostIt });
  } catch (err) {
    next(err);
  }
};

exports.editPostItContent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const postIt = await PostIt.update({ content }, { where: { id } });
    res.json({ postIt });
  } catch (err) {
    next(err);
  }
};

exports.deletePostIt = async (req, res, next) => {
  try {
    const { id } = req.params;
    await PostIt.destroy({ where: { id } });
    res.json({ message: "Delete postIt done" });
  } catch (err) {
    next(err);
  }
};

exports.findRoom = async (req, res, next) => {
  try {
    const { userId2 } = req.body;
    const { id } = req.user;

    const room = await RoomChat.findOne({
      where: {
        [Op.or]: [
          { userId1: id, userId2: userId2 },
          { userId1: userId2, userId2: id },
        ],
      },
    });

    if (room) {
      res.json({ room });
    } else {
      const room = await RoomChat.create({
        roomId: uuidv4(),
        userId1: id,
        userId2: userId2,
      });
      res.json({ room });
    }
  } catch (err) {
    next(err);
  }
};
