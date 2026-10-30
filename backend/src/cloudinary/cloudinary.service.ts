import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import 'multer';

@Injectable()
export class CloudinaryService {

    constructor(private readonly configService: ConfigService) {
        cloudinary.config({
        cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
        api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
        api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
        });
    }

    async subirImagen(archivo: Express.Multer.File, carpeta: string): Promise<string> {

        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {folder: carpeta},
                (error, result) => {
                    if(error || !result){
                        return reject(new InternalServerErrorException('Error al subir la imagen a Cloudinary'));
                    }
                    resolve(result.secure_url);
                }
            );

            uploadStream.end(archivo.buffer);
        });
    }
}
