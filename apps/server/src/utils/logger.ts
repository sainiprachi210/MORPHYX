import { env } from '../config/env.js';

export type LogLevel = 'error' | 'warn' | 'info' | 'debug';

const LOG_PRIORITIES: Record<LogLevel, number> = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

interface LogPayload {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: string;
  metadata?: Record<string, unknown>;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

class Logger {
  private level: LogLevel;

  constructor() {
    this.level = env.LOG_LEVEL;
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_PRIORITIES[level] <= LOG_PRIORITIES[this.level];
  }

  private format(payload: LogPayload): string {
    if (env.NODE_ENV === 'production') {
      return JSON.stringify(payload);
    }

    const colors: Record<LogLevel, string> = {
      error: '\x1b[31m', // Red
      warn: '\x1b[33m', // Yellow
      info: '\x1b[36m', // Cyan
      debug: '\x1b[90m', // Gray
    };
    const reset = '\x1b[0m';
    const color = colors[payload.level] || '';
    const ctx = payload.context ? ` [${payload.context}]` : '';
    const meta = payload.metadata ? ` ${JSON.stringify(payload.metadata)}` : '';
    const err = payload.error?.stack
      ? `\n${payload.error.stack}`
      : payload.error
        ? ` ${payload.error.message}`
        : '';

    return `${payload.timestamp} ${color}[${payload.level.toUpperCase()}]${reset}${ctx} ${payload.message}${meta}${err}`;
  }

  public error(
    message: string,
    error?: unknown,
    context?: string,
    metadata?: Record<string, unknown>
  ): void {
    if (!this.shouldLog('error')) return;

    const errorObj =
      error instanceof Error
        ? { name: error.name, message: error.message, stack: error.stack }
        : error
          ? { name: 'UnknownError', message: String(error) }
          : undefined;

    const entry: LogPayload = {
      level: 'error',
      message,
      timestamp: new Date().toISOString(),
      context,
      metadata,
      error: errorObj,
    };
    console.error(this.format(entry));
  }

  public warn(message: string, context?: string, metadata?: Record<string, unknown>): void {
    if (!this.shouldLog('warn')) return;
    const entry: LogPayload = {
      level: 'warn',
      message,
      timestamp: new Date().toISOString(),
      context,
      metadata,
    };
    console.warn(this.format(entry));
  }

  public info(message: string, context?: string, metadata?: Record<string, unknown>): void {
    if (!this.shouldLog('info')) return;
    const entry: LogPayload = {
      level: 'info',
      message,
      timestamp: new Date().toISOString(),
      context,
      metadata,
    };
    console.log(this.format(entry));
  }

  public debug(message: string, context?: string, metadata?: Record<string, unknown>): void {
    if (!this.shouldLog('debug')) return;
    const entry: LogPayload = {
      level: 'debug',
      message,
      timestamp: new Date().toISOString(),
      context,
      metadata,
    };
    console.debug(this.format(entry));
  }
}

export const logger = new Logger();
