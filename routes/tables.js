const express = require('express');

const router = express.Router();

const tablesController = require('../controllers/tables');


// With the following lines we go to the controllers
router.get('/', tablesController.getTables);

router.get('/:Tables_in_elidek', tablesController.getData);


module.exports = router;