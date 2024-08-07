const express = require('express');
const { getAll, get, create, update, deletePost } = require('../controllers/post');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

router.get('/', getAll);
router.get('/:id', get);
router.post('/', verifyToken, create);
router.patch('/:id', update);
router.delete('/:id', deletePost);

module.exports = router;