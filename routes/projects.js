const express = require('express');

const router = express.Router();

const projectsController = require('../controllers/projects');


// With the following lines we go to the controllers
router.get('/top', projectsController.getTop);

router.get('/no_del', projectsController.getRes);

router.get('/by_researcher', projectsController.getPorjectsByResearcher);

router.get('/by_executive', projectsController.getPorjectsByExecutive);

router.get('/:project_id', projectsController.getResearchers);



module.exports = router;