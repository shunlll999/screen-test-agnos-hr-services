const express = require('express');
const router = express.Router();
const { addPatient, updatePatient, generateSessionId, getExistingPatient, getExistingPatientById } = require('../controllers/patientController');

// POST
router.post('/intake', addPatient);

// GET
router.get('/session', generateSessionId);
router.get('/existing-id/:id', getExistingPatientById);
router.get('/existing', getExistingPatient);

// PATCH
router.put('/intake', updatePatient);

module.exports = router;
