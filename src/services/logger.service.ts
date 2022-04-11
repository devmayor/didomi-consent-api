import { Injectable, LoggerService } from '@nestjs/common';
import 'dotenv/config';

@Injectable()
export class LoggingService implements LoggerService {
  private logger: Console;
  constructor() {
    if (process.env.NODE_ENV !== 'local') {
      this.initializeLogger();
    } else {
      this.logger = console;
    }
  }

  initializeLogger() {
    // this should be replaced with a service like sentry
    this.logger = console;
  }

  error(message, trace) {
    this.logger.error(message, trace);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  log(message: string) {
    this.logger.log(message);
  }
}
