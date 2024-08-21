const express = require("express");
const { getAll, upload, get, update } = require("../controllers/user");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.get("/", getAll)
router.patch('/', verifyToken, update);
router.post("/upload", verifyToken, upload);
router.get('/me', verifyToken, get);

module.exports = router;
