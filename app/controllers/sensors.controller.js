//import Sensors model
const {GET_ALL , GET_SENSOR  , INSERT_SENSOR, UPDATE_SENSORS ,
    UPDATE_SENSORS_LOG , GET_SINGLE_ALL_BY_MINUTES ,GET_ALL_BY_MINUTES} = require('../models/sensors.model');
const connection = require('../../config/db.config');
const moment = require('moment');
const UtilObj = require('../util/util')


exports.getAll = function (req, res) {
    connection.query( GET_ALL , (err , result) => {
        if (err) 
        throw err;
        res.end( JSON.stringify(result) );
    });   
};

exports.getAllForMinutes = function (req, res) {  

    const minutes = req.params.minutes;
    const now = new Date();
    var to  = moment(now).format('YYYY-MM-DD HH:mm:ss');
    var from = moment(now).subtract( minutes, "minutes").toDate();
    from =  moment(from).format('YYYY-MM-DD HH:mm:ss');
    
    var data = {};
    data.from = from;
    data.to = to;

    connection.query( GET_ALL , (err , result) => {
        if (err) 
        throw err;
        data.current = result;

        connection.query( GET_ALL_BY_MINUTES , [ from , to ] ,(err , result) => {
            if (err) 
            throw err;

            data.log = result; 
            res.end( JSON.stringify(data) );
        });  
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

exports.getAllSingle = function (req, res) {
    const id = [req.params.id];
    const minutes = req.params.minutes;
    const now = new Date();
    var to  = moment(now).format('YYYY-MM-DD HH:mm:ss');
    var from = moment(now).subtract( minutes, "minutes").toDate();
    from =  moment(from).format('YYYY-MM-DD HH:mm:ss');

    var data = {};
    data.from = from;
    data.to = to;

    connection.query( GET_SENSOR , id ,  (err , result) => {
        if (err) 
        throw err;
        if(result.length == 0 ){
            res.end( JSON.stringify({status : 'failed' , message : 'record not found!'}) );
        }else{

            data.current = result[0];
            connection.query( GET_SINGLE_ALL_BY_MINUTES , [ from , to , id] ,(err , result) => {
                if (err) 
                throw err;

                data.log = result; 
                res.end( JSON.stringify({status : 'success' , data :  data } )); 
            });   
           
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
    let datetime = moment( new Date() ).format('YYYY-MM-DD HH:mm:ss');
    let values = [];

    data.forEach( row =>  {
        queries += connection.format( UPDATE_SENSORS, [row.smoke_level , row.co2_level , datetime ,  row.id  ]);
        values.push( [row.id , row.smoke_level , row.co2_level , datetime ] );
    });
    console.log(queries);
    connection.query(queries ,(err , result) => {
        if (err) 
        throw err;

        connection.query( UPDATE_SENSORS_LOG , [values] , (err , result) => {
            if (err) 
            throw err;
            res.end( JSON.stringify({status : 'success' , message : 'All Fields Updated'}) );
        })

        
    }); 
  
};








//sent email when sensor come to danger zone ----------------------------------------------------------------------------------------------------------------------------
exports.sentWarningEmail = function (req, res, next) {

    var uEmail =  "padulaguruge@gmail.com";
    var id = "10";
    var co2 = "5";
    var smoke = "6";


     UtilObj.sentEmailDanSenesors(uEmail, id, co2, smoke)

   

    


}
