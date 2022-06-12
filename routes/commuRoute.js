const express = require("express");
const commuController = require("../controllers/commuController");

const router = express.Router();

router.get("/emails", commuController.getEmailsByUserId);
router.get("/postIt", commuController.getAllPostIt);
router.post("/createEmail", commuController.createEmail);
router.post("/createPostIt", commuController.createPostIt);
router.patch("/editPostIt/:id", commuController.editPostItContent);
router.delete("/deleteEmail/:id", commuController.deleteEmailById);
router.delete("/postIt/:id", commuController.deletePostIt);
router.get("/getAllMessage/:receiverId", commuController.getMessageById);
router.post("/sendMessage/:receiverId", commuController.sendMessage);

module.exports = router;
