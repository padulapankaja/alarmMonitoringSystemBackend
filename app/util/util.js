const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')

class Util {

    constructor() {

        this.sms = {
            accountSid: "AC82d4e07b438b39c31199300aa61a5c8d",
            authToken: "4ae05f822c42e9faec21d052fcf24ef0",

        };
    }

    // ===========================================================================================
    // ===========================Email Sent     =================================================
    // ===========================================================================================

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

    // sent email when sensor come to danger 
    sentEmailDanSenesors(uEmail, id, co2, smoke) {
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
                defaultLayout: 'sensor.hbs',
            },
            viewPath: './views/',
            extName: '.hbs',

        };
        transport.use('compile', hbs(handlebarOptions));
        const message = {
            from: 'cassertmusic@gmail.com',
            to: uEmail,
            subject: 'Sensor Warning',
            template: 'delete',
            context: {
                id: id,
                co2: co2,
                smoke: smoke
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
    // ===========================================================================================
    // ===========================SMS  Sent     =================================================
    // ===========================================================================================


    sentSMSAlert(id, co2, smoke) {
        var twilio = require('twilio');
        var client = new twilio(this.sms.accountSid, this.sms.authToken);
        client.messages.create({
            body: `                                             Alert                                             Sensor ID :  ${id}                                               Co2 Level :  ${co2} |  Smoke Level :  ${smoke}   `,
            to: '+94769374442',  // Text this number
            from: '+12512921823' // From a valid Twilio number
        }).then((message) => console.log(message.sid));
    }

    // ===========================================================================================
    // ===========================Call  Sent     =================================================
    // ===========================================================================================
    sentCallAlert() {
        var twilio = require('twilio');
        var client = new twilio(this.sms.accountSid, this.sms.authToken);
        client.calls
            .create({
                url: 'http://demo.twilio.com/docs/voice.xml',
                to: '+94769374442',
                from: '+12512921823'
            })
            .then(call => console.log(call.sid));
    }

}

var UtilObj = new Util();
module.exports = UtilObj;