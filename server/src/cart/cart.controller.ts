import { Controller, Post, Get, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartItem } from '@prisma/client';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { CurrentUser } from '@common/decorators';
import { JwtPayload } from '@auth/interfaces';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post('add')
    async addToCart(
        @CurrentUser() user: JwtPayload,
        @Body() data: { productId: string; quantity: number },
    ): Promise<CartItem> {
        return this.cartService.addToCart(user.id, data.productId, data.quantity);
    }

    @Get()
    async getCart(@CurrentUser() user: JwtPayload): Promise<CartItem[]> {
        return this.cartService.getCart(user.id);
    }

    @Delete('remove/:productId')
    async removeFromCart(@CurrentUser() user: JwtPayload, @Param('productId') productId: string): Promise<void> {
        return this.cartService.removeFromCart(user.id, productId);
    }

    @Delete('clear')
    async clearCart(@CurrentUser() user: JwtPayload): Promise<void> {
        return this.cartService.clearCart(user.id);
    }
}
