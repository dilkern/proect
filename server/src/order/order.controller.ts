import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { JwtPayload } from '@auth/interfaces';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    async createOrder(
        @CurrentUser() user: JwtPayload,
        @Body() body: { items: { productId: string; quantity: number }[] },
    ) {
        return this.orderService.createOrder(user.id, body.items);
    }

    @Get()
    async getOrders(@CurrentUser() user: JwtPayload) {
        return this.orderService.getOrders(user.id);
    }
}
