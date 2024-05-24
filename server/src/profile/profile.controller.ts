import { Controller, Put, Get, Body, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { CurrentUser } from '@common/decorators';
import { JwtPayload } from '@auth/interfaces';
import { User } from '@prisma/client';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Get()
    async getProfile(@CurrentUser() user: JwtPayload): Promise<User> {
        return this.profileService.getProfile(user.id);
    }

    @Put()
    async updateProfile(@CurrentUser() user: JwtPayload, @Body() data: Partial<User>): Promise<User> {
        return this.profileService.updateProfile(user.id, data);
    }
}
