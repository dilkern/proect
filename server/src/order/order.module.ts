import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from '@prisma/prisma.service';
import { CartModule } from '../cart/cart.module';

@Module({
    imports: [CartModule],
    providers: [OrderService, PrismaService],
    controllers: [OrderController],
})
export class OrderModule {}
