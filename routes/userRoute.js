const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", userController.getMe);
router.get("/allUser", userController.getAllUser);
router.get("/getAvailableUser", userController.getAvailableUser);

module.exports = router;
