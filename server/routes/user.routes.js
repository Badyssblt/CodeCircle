const express = require("express");
const { getAll, upload } = require("../controllers/user");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.get("/", getAll);
router.post("/upload", verifyToken, upload);

module.exports = router;
