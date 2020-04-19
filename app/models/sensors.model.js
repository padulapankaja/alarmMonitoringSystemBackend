//Queries used in Sensors
module.exports = {
    GET_ALL :  "SELECT * FROM sensors",
    GET_SENSOR :  "SELECT * FROM sensors where id = ?",
    INSERT_SENSOR : "INSERT INTO sensors (floor_id, room_id ) VALUES (? ,? )",
    UPDATE_SENSORS : "UPDATE sensors SET smoke_level = ? , co2_level = ? WHERE id = ?; ",
};
