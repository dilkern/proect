import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { ProfileModule } from './profile/profile.module';
import { MulterModule } from '@nestjs/platform-express';
import * as path from 'path';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { OrderService } from './order/order.service';
import { OrderModule } from './order/order.module';

@Module({
    imports: [
        UserModule,
        PrismaModule,
        AuthModule,
        ConfigModule.forRoot({ isGlobal: true }),
        ProductsModule,
        CartModule,
        ProfileModule,
        MulterModule.register({
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const ext = path.extname(file.originalname);
                    const filename = `${uuid()}${ext}`;
                    cb(null, filename);
                },
            }),
        }),
        OrderModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        OrderService,
    ],
})
export class AppModule {}
