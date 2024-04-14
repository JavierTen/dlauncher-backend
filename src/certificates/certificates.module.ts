import { Module } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CertificatesController } from './certificates.controller';
import { Users } from 'src/users/entities/user.entity';
import { Events } from 'src/events/entities/event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Events])],
  controllers: [CertificatesController],
  providers: [CertificatesService],
  exports: [TypeOrmModule]
})
export class CertificatesModule {}
