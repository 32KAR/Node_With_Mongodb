require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

const options = {
    file: {
        level: 'info',
        filename: './logs/app.log',
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

const logger = winston.createLogger({
    levels: winston.config.npm.levels,
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false
})

module.exports = logger

// module.exports = function () {
//     winston.handleExceptions(
//         new winston.transports.File({ filename: 'uncaughtExceptions.log' })
//     );

//     process.on('unhandledRejection', (ex) => {
//         throw ex;
//     });

//     winston.add(winston.transports.File, { filename: './log/logfile.log' });
//     winston.add(winston.transports.MongoDB, {
//         db: 'mongodb://localhost/vidly-authentication-and-authorization',
//         level: 'error'
//     });
// }