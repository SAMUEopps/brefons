const express = require('express');
const router = express.Router();
const { saveForm, getForms, getFormById } = require('../controllers/dataController');

// Route to save a form
router.post('/forms', saveForm);

// Route to get all forms
router.get('/forms', getForms);

// Route to get a single form by ID
router.get('/forms/:id', getFormById);


module.exports = router;
