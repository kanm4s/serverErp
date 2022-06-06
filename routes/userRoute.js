const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", userController.getMe);
router.get("/allUser", userController.getAllUser);

module.exports = router;
