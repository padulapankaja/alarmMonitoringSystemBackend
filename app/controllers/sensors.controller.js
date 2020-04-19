//import Sensors model
const {GET_ALL , GET_SENSOR  , INSERT_SENSOR, UPDATE_SENSORS } = require('../models/sensors.model');
const connection = require('../../config/db.config');
const moment = require('moment');

exports.getAll = function (req, res) {
    connection.query( GET_ALL , (err , result) => {
        if (err) 
        throw err;
        res.end( JSON.stringify(result) );
    });   
};

exports.get = function (req, res) {
    const param = [req.params.id];
    connection.query( GET_SENSOR , param ,  (err , result) => {
        if (err) 
        throw err;
        if(result.length == 0 ){
            res.end( JSON.stringify({status : 'failed' , message : 'record not found!'}) );
        }else{
            res.end( JSON.stringify({status : 'success' , data : result[0]  } )); 
        }       
    });   
};

exports.insert = function (req, res) {
    const data = req.body;
    if( data.floor_id != undefined && data.room_id != undefined ){
    connection.query( INSERT_SENSOR , [data.floor_id , data.room_id ] ,  (err , result) => {
        if (err) 
        throw err;
        res.end( JSON.stringify(result) );
    }); 
    }else{
        res.end( JSON.stringify({status : 'failed' , message : 'wrong fields'}) ); 
    }  
};

exports.updateall = function (req, res) {
    const data = req.body;
    let queries = "";

    data.forEach( row =>  {
        queries += connection.format( UPDATE_SENSORS, [row.smoke_level , row.co2_level , row.id ]);
    });
    console.log(queries);

    connection.query(queries ,(err , result) => {
        if (err) 
        throw err;
        res.end( JSON.stringify({status : 'success' , message : 'All Fields Updated'}) );
    }); 
  
};


