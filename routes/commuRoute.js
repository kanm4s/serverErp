const express = require("express");
const commuController = require("../controllers/commuController");

const router = express.Router();

router.get("/emails", commuController.getEmailsByUserId);
router.post("/createEmail", commuController.createEmail);
router.delete("/deleteEmail/:id", commuController.deleteEmailById);

module.exports = router;
