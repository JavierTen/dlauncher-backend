import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost', // Cambia esto por la dirección de tu servidor MySQL
    port: 3306,        // Puerto por defecto de MySQL
    username: 'root',  // nombre de usuario
    password: '6cWRY1PUmiwYciQxJXkg',  //  contraseña
    database: 'dlauncherdb', //  nombre de tu base de datos
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true, // Esto creará automáticamente las tablas en la base de datos (¡cuidado en producción!)
};

export default typeOrmConfig;