import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

const { APP_HOST: appHost, APP_NAME: appName, PORT: appPort } = process.env;

async function bootstrap() {
  const port = parseInt(appPort) || 3000;
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ logger: true }));
  app.use(helmet());
  app.enableCors();

  const options = new DocumentBuilder()
    .addServer(appHost)
    .setTitle(appName)
    .setDescription('The NestJS REST Boilerplate API description')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port, '0.0.0.0');
}
bootstrap();
