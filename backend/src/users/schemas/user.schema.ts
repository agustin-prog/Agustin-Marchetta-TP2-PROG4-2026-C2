import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ timestamps: true })
export class User{

    @Prop({ required: true })
    nombre: string;

    @Prop({ required: true })
    apellido: string;

    @Prop({ required: true, unique: true })
    correo: string;

    @Prop({ required: true, unique: true })
    nombreUsuario: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    fechaNacimiento: Date;

    @Prop({ required: true })
    descripcion: string;

    @Prop({ required: false })
    imagenPerfil: string;

    @Prop({ type: String, enum: ['usuario', 'administrador'], default: 'usuario' })
    perfil: string;

    @Prop({ type: Boolean, default: true })
    activo: boolean;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);