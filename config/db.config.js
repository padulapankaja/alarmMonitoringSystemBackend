var mysql = require('mysql');
// Db Credentials 

const DB_Credentials = require ('../app/Credentials/DBCredentials');


const connection = mysql.createConnection({
    host: DB_Credentials.CredentialsOne.host,
    port: DB_Credentials.CredentialsOne.port,
    user: DB_Credentials.CredentialsOne.user,
    password: DB_Credentials.CredentialsOne.password,
    database: DB_Credentials.CredentialsOne.dbname
});
connection.connect((err) => {
    if (err) 
        throw err;
    console.log('Connected!');
});
module.exports = connection;