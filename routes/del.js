const express = require('express');

const router = express.Router();

const delController = require('../controllers/del');

router.post('/', delController.postDel); //o,ti parw apo edw, tha ksekinaei apo /del (localhost/del)
 
module.exports = router;