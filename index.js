const { sequelize, User } = require("./models");
const bcrypt = require("bcryptjs");

// sequelize.sync({ force: true });
// sequelize.sync({ alter: true });

let userData = [
  {
    firstName: "Kantar",
    lastName: "thitinart",
    userName: "kanManager",
    password: bcrypt.hashSync("qweasdzxc", 12),
    email: "kan@erp.com",
    position: "Manager",
    phoneNumber: "0837896783",
  },
  {
    firstName: "Sian",
    lastName: "SuSu",
    userName: "sian",
    password: bcrypt.hashSync("qweasdzxc", 12),
    email: "sian@erp.com",
    position: "junior",
    phoneNumber: "0837812383",
  },
  {
    firstName: "term",
    lastName: "SuSu",
    userName: "term",
    password: bcrypt.hashSync("qweasdzxc", 12),
    email: "term@erp.com",
    position: "junior",
    phoneNumber: "0837232383",
  },
];

const seedData = async () => {
  try {
    await sequelize.sync({ force: true });
    let user_res = await User.bulkCreate(userData);
  } catch (err) {
    console.log(err);
  } finally {
    process.exit(0);
  }
};

// seedData();
