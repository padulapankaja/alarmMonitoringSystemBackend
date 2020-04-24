//Queries used in Sensors
module.exports = {
    GET_ALL :  "SELECT * FROM sensors",
    GET_SENSOR :  "SELECT * FROM sensors where id = ?",
    INSERT_SENSOR : "INSERT INTO sensors (floor_id, room_id ) VALUES (? ,? )",
    UPDATE_SENSORS : "UPDATE sensors SET smoke_level = ? , co2_level = ? , updated_at = ? WHERE id = ?; ",
    UPDATE_SENSORS_LOG : "INSERT INTO sensors_log (sensor_id, smoke_level, co2_level, datetime) VALUES ?;",
    GET_ALL_BY_MINUTES : "SELECT s.datetime , AVG(s.smoke_level) as 'average_smoke' , AVG(s.co2_level) as 'average_co2' FROM sensors_log s WHERE s.datetime >= ? AND s.datetime <= ? GROUP BY s.datetime",
    GET_SINGLE_ALL_BY_MINUTES : "SELECT s.datetime , s.smoke_level ,s.co2_level FROM sensors_log s WHERE s.datetime >= ? AND s.datetime <= ? AND s.sensor_id = ?",
};
