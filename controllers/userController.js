const { User } = require("../models");

exports.getMe = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findOne({
      where: id,
      attributes: {
        exclude: ["password", "lastUpdatePassword", "createdAt", "updatedAt"],
      },
    });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};
