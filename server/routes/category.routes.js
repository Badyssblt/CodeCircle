const express = require("express");
const { getAll } = require("../controllers/category");
const router = express.Router();

router.get("/", getAll);

module.exports = router;
