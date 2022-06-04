const express = require('express');

const router = express.Router();

const organizationController = require('../controllers/organizations');

/*When we give info to the client we use get*/
router.get('/sameprojects_2years', organizationController.getOrganization4);

module.exports = router;