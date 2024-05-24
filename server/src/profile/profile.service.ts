import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class ProfileService {
    constructor(private readonly prisma: PrismaService) {}

    async updateProfile(userId: string, data: Partial<User>): Promise<User> {
        const user = await this.prisma.user.update({
            where: { id: userId },
            data,
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async getProfile(userId: string): Promise<User> {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
}
