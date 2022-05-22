const bcrypt = require("bcryptjs");
const { User } = require("../models");
const validator = require("validator");
const createError = require("../utils/createError");

exports.register = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      userName,
      email,
      password,
      confirmPassword,
      birthDate,
      position,
      phoneNumber,
    } = req.body;

    if (validator.isEmpty(firstName)) {
      createError("Firstname is required", 400);
    }
    if (validator.isEmpty(lastName)) {
      createError("Lastname is required", 400);
    }
    if (validator.isEmpty(userName)) {
      createError("Username is required", 400);
    }
    if (!validator.isEmail(email)) {
      createError("email is required or not correct", 400);
    }

    if (password !== confirmPassword) {
      createError("password did not match", 400);
    }

    const hashed = await bcrypt.hash(password, 10);
    console.log(hashed);

    const user = await User.create({
      firstName,
      lastName,
      userName,
      password: hashed,
      email,
      birthDate,
      position,
      phoneNumber,
    });

    res.json(user);
  } catch (err) {
    next(err);
  }
};
