import * as Transport from 'winston-transport';

export const LogLevel = {
  error: 'error',
  warn: 'warn',
  info: 'info',
  debug: 'debug',
  verbose: 'verbose',
} as const;

Object.freeze(LogLevel);

export interface LoggerConfig {
  logLevel: typeof LogLevel[keyof typeof LogLevel];
  transports?: Transport[];
}

export interface RollbarConfig {
  enabled: boolean;
  codeVersion: string;
  apiKey: string;
  captureUncaught: boolean;
  captureUnhandledRejections: boolean;
}
