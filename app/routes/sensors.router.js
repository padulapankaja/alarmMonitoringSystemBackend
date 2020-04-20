const express = require('express');
const router = express.Router();


const  SensorsController  = require('../controllers/sensors.controller');

//======================================================================================================
//===================================  GET REQUEST       ===============================================
//====================================================================================================== 

//get all sensors data
router.get('/get', SensorsController.getAll);

//get selected sensor data
router.get('/get/:id', SensorsController.get);

//======================================================================================================
//===================================  POST REQUEST       ==============================================
//====================================================================================================== 

//insert new sensor
router.post('/insert', SensorsController.insert);

//update sensors data
router.post('/updateall', SensorsController.updateall);





//export router
module.exports = router


