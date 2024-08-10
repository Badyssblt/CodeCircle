const express = require("express");
const { create, login } = require("../controllers/auth");
const { update, deleteAnswer } = require("../controllers/answer");
const isWriter = require("../middlewares/isWriter");
const router = express.Router();

router.patch("/:id", isWriter, update);
router.delete("/:id", isWriter, deleteAnswer);

module.exports = router;
