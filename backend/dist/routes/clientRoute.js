const express = require('express');//import controller and stuff
const router = express.Router();
const clientController = require('../controllers/clientController');

// Routes for clients

router.get('/getAllClients', clientController.getAllClients);
router.get('/getClients', clientController.getClients);
router.get('/createClients', clientController.createClients);
router.get('/deleteClients', clientController.deleteClients);
router.get('/updateClients', clientController.updateClients);


module.exports = router;