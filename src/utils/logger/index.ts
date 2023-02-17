import { createLogger, transports, format } from 'winston';
import path from 'path';

// Create logger instance
const logger = createLogger({
  level: 'debug', // Set default log level to debug
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    // Write logs to console
    new transports.Console({
      level: 'debug',
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    }),
    // Write all requests and responses to a single file
    new transports.File({
      level: 'info',
      filename: path.join(__dirname, '../../logger/requests.log'),
      format: format.combine(
        format.timestamp(),
        format.json()
      )
    }),
    // Write error messages to a separate file
    new transports.File({
      level: 'error',
      filename: path.join(__dirname, '../../logger/error.log'),
      format: format.combine(
        format.timestamp(),
        format.json()
      )
    })
  ]
});

export { logger };