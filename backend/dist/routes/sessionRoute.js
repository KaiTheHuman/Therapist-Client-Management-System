const express = require('express');  //import controller and stuff
const router = express.Router();
const sessionController = require('../controllers/sessionController');

// Routes for albums
router.get('/getAllSessions', sessionController.getAllSessions);
router.get('/getSessions', sessionController.getSessions);
router.get('/createSessions', sessionController.createSessions);
router.get('/deleteSessions', sessionController.deleteSessions);
router.get('/updateSessions', sessionController.updateSessions);

module.exports = router;