// add sql qury here

module.exports = {
    GET_ALL_USERS :  "SELECT * FROM users",
    GET_USER_FROM_ID :  "SELECT * FROM users where id = ?",
    GET_USER_FROM_NAME :  "SELECT * FROM users where name = ?",
    GET_USER_FROM_EMAIL :  "SELECT * FROM users where email = ?",
    INSERT_USER : "INSERT INTO users (name, password, email, phone ) VALUES (? ,?, ?, ? )",

}
