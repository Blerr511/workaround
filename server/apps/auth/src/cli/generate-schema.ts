import { NestFactory } from '@nestjs/core';

import { join } from 'path';
import { writeFile } from 'fs/promises';
import { AppModule } from '../app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function generateSchema() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('WR Auth')
    .setVersion('1.0.0')
    .setDescription('WR Auth server')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);

  await writeFile(
    join(__dirname, '..', '..', 'openapi.json'),
    JSON.stringify(documentFactory(), null, 2),
  );

  await app.close();
}

generateSchema().then(() => {
  process.exit(0);
});
