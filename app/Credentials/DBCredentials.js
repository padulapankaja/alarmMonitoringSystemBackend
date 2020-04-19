class DBCredentias {
    constructor() {
        this.CredentialsOne = {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'admin',
            dbname: 'alarmsystem'
        }
        this.CredentialsTwo = {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '',
            dbname: 'alarmsystem'
        }

    }

}
var DB_Credentials = new DBCredentias();
module.exports = DB_Credentials;