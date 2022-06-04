const express = require('express');

const router = express.Router();

const delController = require('../controllers/del');

router.post('/', delController.postDel);

module.exports = router;