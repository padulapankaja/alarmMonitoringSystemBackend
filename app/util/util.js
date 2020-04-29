const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')

class Util {

    constructor() {




    }
    // sent email for regiter users
    sentEmailforRegisterUsers(uEmail, password, name) {
        let transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'cassertmusic@gmail.com',
                pass: 'guruge123@sliit'
            }
        });
        const handlebarOptions = {
            viewEngine: {
                extName: '.hbs',
                partialsDir: './views/',
                layoutsDir: './views/',
                defaultLayout: 'index.hbs',
            },
            viewPath: './views/',
            extName: '.hbs',

        };
        transport.use('compile', hbs(handlebarOptions));
        const message = {
            from: 'cassertmusic@gmail.com',
            to: uEmail,
            subject: 'Welcome to Sensors Managment System',
            // html: '<h1>Have the most fun you can in a car!</h1><p>Get your <b>Tesla</b> today!</p>',
            template: 'index',
            context: {                  // <=
                password: password,
                name: name
              }
        };
        transport.sendMail(message, function (err, info) {
            if (err) {
                console.log(err)

            } else {
                console.log(info);
            }
        });
    }







    // sent email for deleted users 
    sentEmailforDeletedUsers(uEmail, name) {
        let transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'cassertmusic@gmail.com',
                pass: 'guruge123@sliit'
            }
        });
        const handlebarOptions = {
            viewEngine: {
                extName: '.hbs',
                partialsDir: './views/',
                layoutsDir: './views/',
                defaultLayout: 'delete.hbs',
            },
            viewPath: './views/',
            extName: '.hbs',

        };
        transport.use('compile', hbs(handlebarOptions));
        const message = {
            from: 'cassertmusic@gmail.com',
            to: uEmail,
            subject: 'Bye to Sensors Managment System',
            // html: '<h1>Have the most fun you can in a car!</h1><p>Get your <b>Tesla</b> today!</p>',
            template: 'delete',
            context: {                  // <=
                
                name: name
              }
        };
        transport.sendMail(message, function (err, info) {
            if (err) {
                console.log(err)

            } else {
                console.log(info);
            }
        });
    }
}

var UtilObj = new Util();
module.exports = UtilObj;