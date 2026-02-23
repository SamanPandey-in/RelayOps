// ============================================================================
// LOGGER - Winston Configuration for Production Logging
// ============================================================================

import winston from 'winston';
import { isProduction } from '../config/index.js';

const logFormat = winston.format.combine(
  winston.format.timestamp({ tz: 'UTC' }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
    let log = `${timestamp} [${level.toUpperCase()}]: ${message}`;
    
    // Add metadata in development
    if (!isProduction && Object.keys(meta).length > 0) {
      log += ` ${JSON.stringify(meta)}`;
    }
    
    // Add stack trace for errors
    if (stack) {
      log += `\n${stack}`;
    }
    
    return log;
  })
);

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  logFormat
);

export const logger = winston.createLogger({
  level: isProduction ? 'info' : 'debug',
  format: logFormat,
  defaultMeta: { service: 'heed-backend' },
  transports: [
    // Console output
    new winston.transports.Console({
      format: isProduction ? logFormat : consoleFormat,
    }),
    
    // File output for errors in production
    ...(isProduction ? [
      new winston.transports.File({ 
        filename: 'logs/error.log', 
        level: 'error',
        maxsize: 5 * 1024 * 1024, // 5MB
        maxFiles: 5,
      }),
      new winston.transports.File({ 
        filename: 'logs/combined.log',
        maxsize: 5 * 1024 * 1024,
        maxFiles: 5,
      }),
    ] : []),
  ],
});

// Create stream for Morgan HTTP logging
export const logStream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

export default logger;