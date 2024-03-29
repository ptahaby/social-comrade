import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true,
  });
  await app.listen(process.env.PORT);
}
bootstrap();
