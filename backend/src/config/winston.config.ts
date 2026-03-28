import * as winston from 'winston';

const isProd = process.env.NODE_ENV === 'production';

export const winstonConfig = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        isProd
          ? winston.format.json()
          : winston.format.combine(
              winston.format.colorize(),
              winston.format.printf(
                ({ level, message, timestamp, context }) =>
                  `${timestamp as string} [${context ?? 'App'}] ${level}: ${message as string}`,
              ),
            ),
      ),
    }),
  ],
};
