import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { Order } from '@prisma/client';
import { CartService } from '../cart/cart.service';

@Injectable()
export class OrderService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly cartService: CartService, // Inject the CartService to clear the cart
    ) {}

    async createOrder(userId: string, items: { productId: string; quantity: number }[]): Promise<Order> {
        if (!Array.isArray(items)) {
            console.error('Invalid items parameter:', items);
            throw new TypeError('items must be an array');
        }

        console.log('Received items:', items);

        const order = await this.prismaService.order.create({
            data: {
                userId,
                items: {
                    create: items.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                    })),
                },
            },
            include: {
                items: true,
            },
        });

        // Clear the cart after order is created
        await this.cartService.clearCart(userId);

        return order;
    }

    async getOrders(userId: string): Promise<Order[]> {
        return this.prismaService.order.findMany({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
    }
}
