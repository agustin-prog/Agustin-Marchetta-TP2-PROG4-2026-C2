import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema.js';
import { Model } from 'mongoose';
import { RegisterUsersDto } from './dto/register.dto.js';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>
    ){}

    async findByCorreo(correo:string){
        const u = await this.userModel.findOne({ correo: correo }).exec();
        if(!u) return null;
        return u;
    }

    async findByNombreUsuario(nombreUsuario:string){
        const u = await this.userModel.findOne({ nombreUsuario: nombreUsuario }).exec();
        if(!u) return null;
        return u;
    }

    async findByCorreoONombreUsuario(correo: string, nombreUsuario: string){
        const u = await this.userModel.findOne({
            $or: [{correo: correo}, {nombreUsuario: nombreUsuario}]
        }).exec();
        if(!u) return null;
        return u;
    }

    async findByIdentificador(identificador: string){
        const u = await this.userModel.findOne({
            $or: [{correo: identificador.toLowerCase()}, {nombreUsuario: identificador.toLowerCase()}]
        }).exec();
        if(!u) throw new NotFoundException('Usuario no encontrado');
        return u;
    }

    async create(dto: RegisterUsersDto){
        const nuevoUsuario = new this.userModel(dto);
        return nuevoUsuario.save();
    }
}
