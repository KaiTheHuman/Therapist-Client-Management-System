const express = require('express');//import controller and stuff
const router = express.Router();
const therapistController = require('../controllers/therapistController');

// Routes for Songs
router.get('/getAllTherapists', therapistController.getAllTherapists);
router.get('/getTherapists', therapistController.getTherapists);
router.get('/createTherapists', therapistController.createTherapists);
router.get('/deleteTherapists', therapistController.deleteTherapists);
router.get('/updateTherapists', therapistController.updateTherapists);

module.exports = router;