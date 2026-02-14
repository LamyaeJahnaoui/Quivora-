import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


/* async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
 */


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    // Simple dev-friendly CORS: allow any origin (no cookies/credentials used)
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });

  await app.listen(3000);
}
bootstrap();
