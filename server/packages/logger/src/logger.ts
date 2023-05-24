import { Format } from 'logform';
import * as winston from 'winston';
import * as Transport from 'winston-transport';

import { LoggerConfig, LogLevel } from './types';
import { colors, deserializeError } from './utils';

export class Logger {
  protected readonly logger: winston.Logger;

  constructor(
    protected readonly namespace: string,
    config?: Partial<LoggerConfig>
  ) {
    const { transports, ...loggerConfig } = { ...Logger.config, ...config };

    this.logger = winston.createLogger({
      level: loggerConfig.logLevel,
      levels: {
        [LogLevel.error]: 0,
        [LogLevel.warn]: 1,
        [LogLevel.info]: 2,
        [LogLevel.debug]: 3,
        [LogLevel.verbose]: 4,
      },
      silent: this.isSilent(),
      // Formats must be set per transport!
      transports: transports || Logger.defaultTransports,
    });
  }

  public static configure(config: Partial<LoggerConfig>) {
    this.config = {
      ...this.config,
      ...config,
    };
  }

  public static defaultTransports: Transport[] = [
    new winston.transports.Console({
      format: winston.format.combine(...Logger.formatWithColor()),
    }),
  ];

  public static formatWithColor(): Format[] {
    return [
      winston.format.colorize({ all: true }),
      winston.format.timestamp({
        format: 'YYYY-MM-DD hh:mm:ss.SSS A',
      }),
      winston.format.printf(
        ({ message, timestamp, level, namespace, meta }: any) => {
          const data = isNotEmpty(meta) ? ` ${JSON.stringify(meta)}` : '';

          return `${colors.red(`[${timestamp}]`)} ${colors.red(
            `[[${namespace}]]`
          )}[${level}]: ${message}${data}`;
        }
      ),
    ];
  }

  protected static config: Partial<LoggerConfig> = {
    logLevel: 'debug',
  };

  log(message: string, ...meta: any) {
    this.logger.log(LogLevel.info, message, {
      meta,
      namespace: this.namespace,
    });
  }

  error(message: string | Error, meta?: any) {
    this.logger.error(message instanceof Error ? message.message : message, {
      meta: meta instanceof Error ? deserializeError(meta) : meta,
      namespace: this.namespace,
    });
  }

  warn(message: string, meta?: any) {
    this.logger.warn(message, { meta, namespace: this.namespace });
  }

  info(message: string, meta?: any) {
    this.logger.info(message, { meta, namespace: this.namespace });
  }

  debug(message: string, meta?: any) {
    this.logger.debug(message, { meta, namespace: this.namespace });
  }

  verbose(message: string, meta?: any) {
    this.logger.verbose(message, { meta, namespace: this.namespace });
  }

  private isSilent() {
    return ['no', 'disabled', 'none', 'false', '0'].includes(
      String(process.env.LOG_LEVEL).toLowerCase()
    );
  }
}

const isNotEmpty = (data: any) => {
  if (!data) return false;

  if (typeof data === 'object') {
    if (Array.isArray(data)) return !!data.length;
    else return Object.keys(data).length;
  }

  return true;
};
