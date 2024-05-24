import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService) {}

    async createProduct(data: Omit<Product, 'id' | 'image'>, image?: Buffer): Promise<Product> {
        return this.prisma.product.create({
            data: {
                ...data,
                image,
            },
        });
    }

    async getProducts(): Promise<Product[]> {
        return this.prisma.product.findMany();
    }

    async getProductById(id: string): Promise<Product> {
        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }

    async updateProduct(id: string, data: Partial<Product>, image?: Buffer): Promise<Product> {
        return this.prisma.product.update({
            where: { id },
            data: {
                ...data,
                image,
            },
        });
    }

    async deleteProduct(id: string): Promise<void> {
        await this.prisma.product.delete({ where: { id } });
    }
}
