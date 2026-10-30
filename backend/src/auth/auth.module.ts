import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { UsersModule } from '../users/users.module.js';
import { AuthController } from './auth.controller.js';
import { CloudinaryModule } from '../cloudinary/cloudinary.module.js';

@Module({
  imports: [UsersModule, CloudinaryModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
