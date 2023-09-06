import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from 'src/roles/entities/rol.entity';
import { Users } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constants';
import { JwtAuthgGuard } from './auth.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Roles]), 
  UsersModule, 
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '24h' },
  })],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtAuthgGuard, JwtStrategy]
})
export class AuthModule {}
