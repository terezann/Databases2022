const express = require('express');

const router = express.Router();

const programController = require('../controllers/program');


/*When we give info to the client we use get*/
router.get('/projects/criteria', programController.getProgramsByCriteria);



/*When we receive data from the client we use post*/
router.post('/projects/criteria', programController.postProgramsByCriteria); 
module.exports = router;