//import User model
const { GET_ALL_USERS, GET_USER_FROM_ID, GET_USER_FROM_NAME, GET_USER_FROM_EMAIL, INSERT_USER, GET_USER_FROM_EMAIL_PASSWORD } = require('../models//users.model');
const connection = require('../../config/db.config');
// test functions
exports.test = function (req, res) {
    res.json({ val: 'Greetings from the Test controller!', des: '1424', kk: '45455' });
};


// register user ----------------------------------------------------------------------------------------------------------------------------
exports.insert = function (req, res, next) {
    const data = req.body;
    console.log(data);
    if (data.name != undefined && data.password != undefined && data.email != undefined && data.phone != undefined) {
        connection.query(GET_USER_FROM_EMAIL, [data.email], (err, result) => {
            if (result < 1) {
                connection.query(INSERT_USER, [data.name, data.password, data.email, data.phone], (err, result) => {
                    if (err)
                        throw err;
                    res.status(200).json({
                        message: 'Registation success'
                    })
                    next()
                });
            } else {
                res.status(201).json({
                    message: 'Alread Registerd'
                })
                next()
            }
        });
    } else {
        res.status(202).json({
            message: 'Registation Unsucess'
        })
        next()
    }
};

//user login  ----------------------------------------------------------------------------------------------------------------------------
exports.login = function (req, res, next) {
    const data = req.body.admin;

    console.log(data);
    if (data.uPass != undefined && data.uEmail != undefined ) {
        connection.query(GET_USER_FROM_EMAIL_PASSWORD, [data.uEmail, data.uPass ], (err, result) => {
            if (err) 
            throw err;
            if(result.length == 1 ){
                res.status(200).json({
                    message: 'Login Sucess',
                    user: result[0],
                    status: true
                })
            }else{
                res.status(201).json({
                    message: 'No data',
                    status: false
                   
                })
            }       
        });
       
    } else {
        res.status(202).json({
            message: 'Please sent valid details',
            status: false
        })
        next()
    }
};
