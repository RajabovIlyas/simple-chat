import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { HttpStatus, Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { environment } from './environments';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: environment.baseUrl || 'http://localhost:3000',
      credentials: true,
    },
  });
  app.use(cookieParser());

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}
bootstrap();
