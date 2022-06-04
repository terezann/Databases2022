const express = require('express');

const router = express.Router();

const execController = require('../controllers/exec');

router.get('/give', execController.getExec);

module.exports = router;