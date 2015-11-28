var winston = require('winston');
var path = require('path');
var logger = new(winston.Logger)({
    transports: [
        new(winston.transports.Console)({
            level: 'debug',
            json: false,
            timestamp: true
        }),
        new winston.transports.DailyRotateFile({
            filename: path.join(__dirname, "logs", "PayMyFee-debug.log"),
            level: 'debug',
            json: false,
            timestamp: true
        })
    ],
    exceptionHandlers: [
        new(winston.transports.Console)({
            json: false,
            timestamp: true
        }),
        new winston.transports.DailyRotateFile({
            filename: path.join(__dirname, "logs", "PayMyFee-exception.log"),
            json: false,
            timestamp: true
        })
    ],
    exitOnError: false
});
module.exports = logger;
