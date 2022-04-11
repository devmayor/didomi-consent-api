import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { LoggingService } from '../services/logger.service';

/**
 * Filter to catch all http responses that carry a 500 Exception code. Then we log it.
 * @todo Setup an alert system with the logs
 */
@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private logger = new LoggingService();
  catch(exception: any, host: ArgumentsHost) {
    if (
      !(exception instanceof HttpException) ||
      (exception instanceof HttpException && exception.getStatus() === 500)
    ) {
      this.logger.error(exception.message || 'Error:', exception);
    }
    super.catch(exception, host);
  }
}
