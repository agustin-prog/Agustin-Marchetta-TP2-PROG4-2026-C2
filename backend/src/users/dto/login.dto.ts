import { IsNotEmpty, IsString } from "class-validator";

export class LoginUsersDto {
    
    @IsString()
    @IsNotEmpty({ message: 'Ingrese el correo o el nombre de usuario para ingresar' })
    identificador!: string

    @IsString()
    @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
    password!: string
}