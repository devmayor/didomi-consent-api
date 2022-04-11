import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './filters';

import 'dotenv/config';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Set auto validation using DTO for APIs and Auto Transform for those values
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // Set up global exception filter to cath all Unknown 500 errors
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // Allows dependency injection into class validators
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.PORT);
}
bootstrap();
