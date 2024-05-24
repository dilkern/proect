import {
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    UseGuards,
    ForbiddenException,
    NotFoundException,
    Logger,
} from '@nestjs/common';
import { UserService } from '@user/user.service';
import { UserResponse } from '@user/responses';
import { CurrentUser, Roles } from '@common/decorators';
import { JwtPayload } from '@auth/interfaces';
import { RolesGuard } from '@auth/guards/role.guard';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { Role } from '@prisma/client';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
    private readonly logger = new Logger(UserController.name);

    constructor(private readonly userService: UserService) {}

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Get()
    async findAllUsers() {
        this.logger.log('Fetching all users');
        const users = await this.userService.findAll();
        this.logger.log(`Found ${users.length} users`);
        return users.map((user) => new UserResponse(user));
    }

    @Get(':idOrEmail')
    async findOneUser(@Param('idOrEmail') idOrEmail: string) {
        this.logger.log(`Fetching user with idOrEmail: ${idOrEmail}`);
        const user = await this.userService.finOne(idOrEmail);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return new UserResponse(user);
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: JwtPayload) {
        if (user.id !== id && !user.roles.includes(Role.ADMIN)) {
            throw new ForbiddenException('You are not allowed to delete this user');
        }
        this.logger.log(`Deleting user with id: ${id}`);
        const deletedUser = await this.userService.delete(id, user);
        if (!deletedUser) {
            throw new NotFoundException('User not found');
        }
        return { message: 'User deleted successfully' };
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Get('me')
    me(@CurrentUser() user: JwtPayload) {
        this.logger.log(`Fetching current user: ${user.id}`);
        return user;
    }
}
