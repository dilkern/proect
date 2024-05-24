import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CartItem } from '@prisma/client';

@Injectable()
export class CartService {
    constructor(private readonly prisma: PrismaService) {}

    async addToCart(userId: string, productId: string, quantity: number): Promise<CartItem> {
        const product = await this.prisma.product.findUnique({ where: { id: productId } });
        if (!product) {
            throw new NotFoundException('Product not found');
        }

        const cartItem = await this.prisma.cartItem.findFirst({
            where: { userId, productId },
        });

        if (cartItem) {
            return this.prisma.cartItem.update({
                where: { id: cartItem.id },
                data: { quantity: cartItem.quantity + quantity },
            });
        } else {
            return this.prisma.cartItem.create({
                data: { userId, productId, quantity },
            });
        }
    }

    async getCart(userId: string): Promise<CartItem[]> {
        return this.prisma.cartItem.findMany({
            where: { userId },
            include: { product: true },
        });
    }

    async removeFromCart(userId: string, productId: string): Promise<void> {
        const cartItem = await this.prisma.cartItem.findFirst({
            where: { userId, productId },
        });

        if (!cartItem) {
            throw new NotFoundException('CartItem not found');
        }

        await this.prisma.cartItem.delete({
            where: { id: cartItem.id },
        });
    }

    async clearCart(userId: string): Promise<void> {
        await this.prisma.cartItem.deleteMany({
            where: { userId },
        });
    }
}
