import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.use(cookieParser());
    app.enableCors();

    app.useStaticAssets(path.join(__dirname, '..', 'uploads'), {
        prefix: '/uploads/',
    });

    app.use('/', express.static('/uploads'));

    await app.listen(3000);
}
bootstrap();
