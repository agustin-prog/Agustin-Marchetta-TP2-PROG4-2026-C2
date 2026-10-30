import { 
  Controller, Post, Body, HttpCode, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';
import { AuthService } from './auth.service.js';
import { RegisterUsersDto } from '../users/dto/register.dto.js';
import { LoginUsersDto } from '../users/dto/login.dto.js';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @UseInterceptors(FileInterceptor('avatar'))
    createRegister(
        @Body() dto: RegisterUsersDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024, message: 'El archivo supera los 2MB' }),
                    new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp)' }),
                ],
                fileIsRequired: false,
            }),
        )
        archivo?: Express.Multer.File,
    ){
        return this.authService.register(dto, archivo);
    }

    @Post('login')
    @HttpCode(200)
    login(@Body() dto: LoginUsersDto) {
        return this.authService.login(dto);
    }
}
