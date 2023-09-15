
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config'; // Importa ConfigService

const typeOrmConfig = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'mysql',
    host: configService.get<string>('DB_HOST'), // Accede a las variables de entorno
    port: parseInt(configService.get<string>('DB_PORT'), 10), // Asegúrate de parsear el puerto a un número
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  };
};

export default typeOrmConfig;