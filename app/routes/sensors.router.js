const express = require('express');
const router = express.Router();


const SensorsController = require('../controllers/sensors.controller');

//======================================================================================================
//===================================  GET REQUEST       ===============================================
//====================================================================================================== 

//get all sensors data
router.get('/get', SensorsController.getAll);
router.get('/getall/:minutes', SensorsController.getAllForMinutes);
//get selected sensor data
router.get('/get/:id', SensorsController.get);
router.get('/getall/:id/:minutes', SensorsController.getAllSingle);
//======================================================================================================
//===================================  POST REQUEST       ==============================================
//====================================================================================================== 

//insert new sensor
router.post('/insert', SensorsController.insert);
//update sensors data
router.post('/updateall', SensorsController.updateall);

//======================================================================================================
//===================================  PATCH REQUEST       ==============================================
//====================================================================================================== 

router.post( '/update' , SensorsController.update );
router.post( '/delete/:id' , SensorsController.delete );


// sent warning email when sensor come danget level
router.get('/warning/email', SensorsController.sentWarningEmail);
// sent warning email when sensor come danget level
router.get('/warning/sms', SensorsController.sentWarningSMS);
// sent warning call when sensor come danget level
router.get('/warning/call', SensorsController.sentCallAlert);



//export router
module.exports = router


