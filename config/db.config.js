var mysql = require('mysql');
// Db Credentials 

const DB_Credentials = require ('../app/Credentials/DBCredentials');

const DB_Connection = DB_Credentials.CredentialsTwo;
const connection = mysql.createConnection({
    host: DB_Connection.host,
    port: DB_Connection.port,
    user: DB_Connection.user,
    password: DB_Connection.password,
    database: DB_Connection.dbname,
    multipleStatements:true ,
});

connection.connect((err) => {
    if (err) 
        throw err;
    console.log('Connected!');
});
module.exports = connection;