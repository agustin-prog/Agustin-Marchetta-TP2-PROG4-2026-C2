import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class RegisterUsersDto {

    @IsString()
    @IsNotEmpty({ message: 'El campo del nombre no puede estar vacío' })
    nombre!: string;

    @IsString()
    @IsNotEmpty({ message: 'El campo del apellido no puede estar vacío' })
    apellido!: string

    @IsEmail({}, { message: 'El formato del correo no es válido' })
    @IsNotEmpty({ message: 'El campo del correo no puede estar vacío' })
    correo!: string;

    @IsString()
    @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
    @MinLength(8, { message: 'La contraseña debe tener mínimo 8 caracteres' })
    @Matches(/[A-Z]/, { message: 'La contraseña debe tener al menos una mayúscula' })
    @Matches(/\d/, { message: 'La contraseña debe tener al menos un número' })
    password!: string

    @IsString()
    @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacío' })
    @MinLength(3, { message: 'El nombre de usuario debe tener mínimo 3 caracteres' })
    @Matches(/^\S+$/, { message: 'El nombre de usuario no puede tener espacios' })
    nombreUsuario!: string

    @IsDateString() // valida strings en formato ISO (ej: "2000-12-25")
    @IsNotEmpty({ message: 'La fecha de nacimiento no puede estar vacía' })
    fechaNacimiento!: string;

    @IsOptional()
    @IsString()
    imagenPerfil?: string;

    @IsString()
    @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
    @MaxLength(200, { message: 'La descripción no puede superar los 200 caracteres' })
    descripcion!: string;
}