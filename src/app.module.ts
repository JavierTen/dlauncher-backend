import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './typeorm.config';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { EventsModule } from './events/events.module';
import { TeamsModule } from './teams/teams.module';
import { UsersTeamEventModule } from './users-team-event/users-team-event.module';
import { DepartamentModule } from './departament/departament.module';
import { MunicipalityModule } from './municipality/municipality.module';
import { DocumentTypeModule } from './document-type/document-type.module';



@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig)
    , RolesModule, UsersModule, AuthModule, EventsModule, TeamsModule, UsersTeamEventModule, DepartamentModule, MunicipalityModule, DocumentTypeModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule { } 
