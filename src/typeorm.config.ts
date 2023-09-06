import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'db-mysql-dlauncher-do-user-14622097-0.b.db.ondigitalocean.com', // Cambia esto por la dirección de tu servidor MySQL
    port: 25060,        // Puerto por defecto de MySQL
    username: 'doadmin',  // nombre de usuario
    password: 'AVNS_hbHlvmBcPd4_uY-1dU1',  //  contraseña
    database: 'dlauncherdb', //  nombre de tu base de datos
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true, // Esto creará automáticamente las tablas en la base de datos (¡cuidado en producción!)
};

export default typeOrmConfig;