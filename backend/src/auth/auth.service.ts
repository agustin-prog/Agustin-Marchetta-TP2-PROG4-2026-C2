import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { RegisterUsersDto } from '../users/dto/register.dto.js';
import * as bcrypt from 'bcrypt';
import { LoginUsersDto } from '../users/dto/login.dto.js';
import 'multer';
import { CloudinaryService } from '../cloudinary/cloudinary.service.js';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly cloudinaryService: CloudinaryService,
    ) {}

    async register(dto: RegisterUsersDto, archivo?: Express.Multer.File){

        const correoNormalizado = dto.correo.trim().toLowerCase();
        const nombreUsuarioNormalizado = dto.nombreUsuario.trim();

        const usuarioPorCorreo = await this.usersService.findByCorreo(correoNormalizado);
        if (usuarioPorCorreo) {
            throw new ConflictException('El correo electrónico ya está en uso');
        }

        const usuarioPorNombre = await this.usersService.findByNombreUsuario(nombreUsuarioNormalizado);
        if (usuarioPorNombre) {
            throw new ConflictException('El nombre de usuario ya está en uso');
        }

        let avatarUrl = "";
        if (archivo) {
        avatarUrl = await this.cloudinaryService.subirImagen(archivo, 'usuarios');
        }

        const passwordHasheada = await bcrypt.hash(dto.password, 10);

        const usuarioGuardado = await this.usersService.create({
            ...dto,
            nombreUsuario: nombreUsuarioNormalizado,
            correo: correoNormalizado,
            password: passwordHasheada,
            imagenPerfil: avatarUrl,
        });

        const usuarioObj = usuarioGuardado.toObject();
        const { password, ...resto } = usuarioObj;

        return resto;
    }

    async login(dto: LoginUsersDto){

        const identificador = dto.identificador.trim();
        
        const usuario = await this.usersService.findByIdentificador(identificador);
        if(!usuario){
            throw new UnauthorizedException('Credenciales inválidas');
        }
        
        const passwordCorrecta = await bcrypt.compare(dto.password, usuario.password);
        if(!passwordCorrecta){
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const usuarioObj = usuario.toObject();
        const { password, ...resto } = usuarioObj;

        return resto;
    }
}
