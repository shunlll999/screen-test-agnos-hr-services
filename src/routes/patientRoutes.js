const express = require('express');
const router = express.Router();
const { addPatient, generateSessionId, getExistingPatient, getExistingPatientById } = require('../controllers/patientController');

// POST
router.post('/intake', addPatient);

// GET
router.get('/session', generateSessionId);
router.get('/existing/:id', getExistingPatientById);
router.get('/existing', getExistingPatient);

module.exports = router;
