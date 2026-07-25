const express = require('express');
const router = express.Router();
const { addPatient, generateSessionId } = require('../controllers/patientController');

router.post('/intake', addPatient);
router.get('/session', generateSessionId);

module.exports = router;
