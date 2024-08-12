const express = require("express");
const {
  getAll,
  get,
  create,
  update,
  deletePost,
  answer,
  search,
} = require("../controllers/post");
const verifyToken = require("../middlewares/verifyToken");
const isOwner = require("../middlewares/isOwner");
const router = express.Router();

router.get("/", getAll);
router.get("/search", search);
router.get("/:id", get);
router.post("/", verifyToken, create);
router.patch("/:id", isOwner, update);
router.delete("/:id", deletePost);
router.post("/:id/answer", verifyToken, answer);

module.exports = router;
