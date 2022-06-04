const express = require('express');

const router = express.Router();

const sci_fieldController = require('../controllers/sci_field');


// With the following lines we go to the controllers
router.get('/top3', sci_fieldController.getTop3);

router.get('/with_interest', sci_fieldController.getSci_fieldWithInterest);

router.post('/with_interest', sci_fieldController.postSci_fieldWithInterest);

module.exports = router;