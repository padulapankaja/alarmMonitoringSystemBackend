const express = require('express');
const router = express.Router();


const  UsersController  = require('../controllers/users.controller');

//======================================================================================================
//===================================  GET REQUEST       ===============================================
//====================================================================================================== 

//test router
router.get('/test', UsersController.test);
router.get('/a/all', UsersController.getAllAdmins);



//======================================================================================================
//===================================  POST REQUEST       ==============================================
//====================================================================================================== 

router.post('/register', UsersController.insert);
router.post('/login', UsersController.login);




//export router
module.exports = router


