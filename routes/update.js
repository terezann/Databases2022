const express = require('express');

const router = express.Router();

const updateController = require('../controllers/update');

// this comes 1st
router.post('/show_form_update', updateController.showForm);  // comes from data.ejs and renders to each insrtion and creation ejs file

router.post('/perform_update', updateController.perform_update); //perform the update



module.exports = router;