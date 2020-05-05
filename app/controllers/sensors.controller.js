//import Sensors model
const {GET_ALL , GET_SENSOR  , INSERT_SENSOR, UPDATE_SENSORS ,UPDATE_SENSOR, DELETE_SENSOR,
    UPDATE_SENSORS_LOG , GET_SINGLE_ALL_BY_MINUTES ,GET_ALL_BY_MINUTES} = require('../models/sensors.model');
const connection = require('../../config/db.config');
const moment = require('moment');
// import email sent
const UtilObj = require('../util/util')


exports.getAll = function (req, res) {
    connection.query(GET_ALL, (err, result) => {
        if (err)
            throw err;
        res.end(JSON.stringify(result));
    });
};

exports.getAllForMinutes = function (req, res) {

    const minutes = req.params.minutes;
    const now = new Date();
    var to = moment(now).format('YYYY-MM-DD HH:mm:ss');
    var from = moment(now).subtract(minutes, "minutes").toDate();
    from = moment(from).format('YYYY-MM-DD HH:mm:ss');

    var data = {};
    data.from = from;
    data.to = to;

    connection.query(GET_ALL, (err, result) => {
        if (err)
            throw err;
        data.current = result;

        connection.query(GET_ALL_BY_MINUTES, [from, to], (err, result) => {
            if (err)
                throw err;

            data.log = result;
            res.end(JSON.stringify(data));
        });
    });
};

exports.get = function (req, res) {
    const param = [req.params.id];
    connection.query(GET_SENSOR, param, (err, result) => {
        if (err)
            throw err;
        if (result.length == 0) {
            res.end(JSON.stringify({ status: 'failed', message: 'record not found!' }));
        } else {
            res.end(JSON.stringify({ status: 'success', data: result[0] }));
        }
    });
};

exports.getAllSingle = function (req, res) {
    const id = [req.params.id];
    const minutes = req.params.minutes;
    const now = new Date();
    var to = moment(now).format('YYYY-MM-DD HH:mm:ss');
    var from = moment(now).subtract(minutes, "minutes").toDate();
    from = moment(from).format('YYYY-MM-DD HH:mm:ss');

    var data = {};
    data.from = from;
    data.to = to;

    connection.query(GET_SENSOR, id, (err, result) => {
        if (err)
            throw err;
        if (result.length == 0) {
            res.end(JSON.stringify({ status: 'failed', message: 'record not found!' }));
        } else {

            data.current = result[0];
            connection.query(GET_SINGLE_ALL_BY_MINUTES, [from, to, id], (err, result) => {
                if (err)
                    throw err;

                data.log = result;
                res.end(JSON.stringify({ status: 'success', data: data }));
            });

        }
    });
};

exports.insert = function (req, res) {
    const data = req.body;
    if (data.floor_id != undefined && data.room_id != undefined) {
        connection.query(INSERT_SENSOR, [data.floor_id, data.room_id], (err, result) => {
            if (err)
                throw err;
            res.end(JSON.stringify(result));
        });
    } else {
        res.end(JSON.stringify({ status: 'failed', message: 'wrong fields' }));
    }
};

exports.update = function (req, res) {
     const data = req.body;
     const updated_at = moment( new Date() ).format('YYYY-MM-DD HH:mm:ss');
    
     if( data.floor_id != undefined && data.room_id != undefined  && data.id != undefined ){
    connection.query( UPDATE_SENSOR , [data.floor_id , data.room_id ,  updated_at , data.id] ,  (err , result) => {
        if (err) 
        throw err;
        console.log(result);
        res.end( JSON.stringify({status : 'success' , message : 'Successfully Updated'}) ); 
    }); 
    }else{
        res.end( JSON.stringify({status : 'failed' , message : 'Wrong Fields'}) ); 
    }  
};

exports.delete = function (req, res) {
    const id = [req.params.id];
   connection.query( DELETE_SENSOR , id ,  (err , result) => {
       if (err) 
       throw err;
       res.end( JSON.stringify({status : 'success' , message : 'Successfully Deleted'}) ); 
   }); 

};

exports.updateall = function (req, res) {
    const data = req.body;
    let queries = "";
    let datetime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    let values = [];
    let alerts = [];

    data.forEach(row => {
        queries += connection.format(UPDATE_SENSORS, [row.smoke_level, row.co2_level, datetime, row.id]);
        values.push([row.id, row.smoke_level, row.co2_level, datetime]);

        if( row.smoke_level > 5 ||   row.co2_level > 5 ){
            alerts.push(row);
        }

    });

    alerts.forEach( item => {
        UtilObj.sentEmailDanSenesors("amoda29@gmail.com", item.id , item.co2_level , item.smoke_level );
        UtilObj.sentSMSAlert(item.id, item.co2_level , item.smoke_level);
    })
   

    connection.query(queries, (err, result) => {
        if (err)
            throw err;

        connection.query(UPDATE_SENSORS_LOG, [values], (err, result) => {
            if (err)
                throw err;
            res.end(JSON.stringify({ status: 'success', message: 'All Fields Updated' }));
        })


    });

};





// ==========================================================================================================================
// ==========================================================================================================================
// ================================================ ALERT SERVICE ===========================================================
// ==========================================================================================================================
// ==========================================================================================================================


//sent email when sensor come to danger zone ----------------------------------------------------------------
exports.sentWarningEmail = function (req, res, next) {

    var uEmail = "padulaguruge@gmail.com";
    var id = "10";
    var co2 = "5";
    var smoke = "6";

    UtilObj.sentEmailDanSenesors(uEmail, id, co2, smoke)

}
//sent SMS when sensor come to danger zone ----------------------------------------------------------------------
exports.sentWarningSMS = function (req, res, next) {

    var id = "10";
    var co2 = "5";
    var smoke = "6";

    console.log("called");
    UtilObj.sentSMSAlert(id, co2, smoke);
    res.json({status : 'done'})

}
//sent Call when sensor come to danger zone -------------------------------------------------------------------------
exports.sentCallAlert = function (req, res, next) {
    UtilObj.sentCallAlert()
    res.json({status : 'done'})

}
