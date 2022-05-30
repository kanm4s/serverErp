const validator = require("validator");
const createError = require("../utils/createError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");

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

    if (validator.isEmpty(firstName + "")) {
      createError("Firstname is required", 400);
    }
    if (validator.isEmpty(lastName + "")) {
      createError("Lastname is required", 400);
    }
    if (validator.isEmpty(userName + "")) {
      createError("Username is required", 400);
    }
    if (validator.isEmpty(password + "")) {
      createError("Password is required", 400);
    }

    if (password !== confirmPassword) {
      createError("password did not match", 400);
    }

    const hashed = await bcrypt.hash(password, 10);
    console.log(hashed);

    await User.create({
      firstName,
      lastName,
      userName,
      password: hashed,
      email,
      birthDate,
      position,
      phoneNumber,
    });

    res.status(200).json({ message: "Signup success" });
  } catch (err) {
    next(err);
  }
};

exports.getUserByUsername = async (req, res, next) => {
  const { userName } = req.body;

  if (validator.isEmpty(userName + "")) {
    createError("userName is required", 400);
  }

  const result = await User.findOne({ where: { userName } });

  if (!result) {
    createError("invalid username or password", 400);
  }

  req.body.getUser = result;
  next();
};

exports.login = async (req, res, next) => {
  try {
    const { password, getUser } = req.body;

    if (validator.isEmpty(password + "")) {
      createError("Password is required", 400);
    }

    const isCorrectPassword = await bcrypt.compare(password, getUser.password);

    const payload = {
      id: getUser.id,
      firstName: getUser.firstName,
      position: getUser.position,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "30d",
    });
    if (isCorrectPassword) {
      res.json({ message: "login success", token: token });
    } else {
      createError("invalid username or password");
    }
  } catch (err) {
    next(err);
  }
};
