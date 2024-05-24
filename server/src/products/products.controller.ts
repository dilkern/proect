import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Param,
    Body,
    UseGuards,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { Product } from '@prisma/client';
import { Roles } from '@common/decorators';
import { RolesGuard } from '@auth/guards/role.guard';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { Role } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Roles(Role.ADMIN)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async createProduct(
        @Body() data: Omit<Product, 'id' | 'image'>,
        @UploadedFile() file: Express.Multer.File,
    ): Promise<Product> {
        const imageBuffer = file ? file.buffer : null;
        return this.productService.createProduct(data, imageBuffer);
    }

    @Get()
    getProducts(): Promise<Product[]> {
        return this.productService.getProducts();
    }

    @Get(':id')
    getProductById(@Param('id') id: string): Promise<Product> {
        return this.productService.getProductById(id);
    }

    @Roles(Role.ADMIN)
    @Put(':id')
    @UseInterceptors(FileInterceptor('image'))
    updateProduct(
        @Param('id') id: string,
        @Body() data: Partial<Product>,
        @UploadedFile() file: Express.Multer.File,
    ): Promise<Product> {
        const imageBuffer = file ? file.buffer : null;
        return this.productService.updateProduct(id, data, imageBuffer);
    }

    @Roles(Role.ADMIN)
    @Delete(':id')
    deleteProduct(@Param('id') id: string): Promise<void> {
        return this.productService.deleteProduct(id);
    }
}
