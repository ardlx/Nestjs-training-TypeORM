import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  
  //nestjs swagger documentation set up
  const config = new DocumentBuilder()
  .setTitle('Nest JS Training')
  .setDescription('Product Description')
  .setVersion('1.0')
  .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  
  //for validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  })
  )
  
  await app.listen(3333);
}
bootstrap();
