const express = require("express");
const { create, login } = require("../controllers/auth");
const {
  update,
  deleteAnswer,
  setAsAccepted,
} = require("../controllers/answer");
const isWriter = require("../middlewares/isWriter");
const isOwner = require("../middlewares/isOwner");
const router = express.Router();

router.patch("/:id", isWriter, update);
router.delete("/:id", isWriter, deleteAnswer);
router.patch("/:id/accepted/:postId", isOwner, setAsAccepted);

module.exports = router;
