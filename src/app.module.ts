import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importa ConfigModule
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './typeorm.config';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { EventsModule } from './events/events.module';
import { TeamsModule } from './teams/teams.module';
import { UsersTeamEventModule } from './users-team-event/users-team-event.module';
import { DepartamentModule } from './departament/departament.module';
import { MunicipalityModule } from './municipality/municipality.module';
import { DocumentTypeModule } from './document-type/document-type.module';
import { EventEvaluatorModule } from './event-evaluator/event-evaluator.module';
import { EvaluatorQualificationModule } from './evaluator-qualification/evaluator-qualification.module';
import { RubricsModule } from './rubrics/rubrics.module';
import { RubricsSectionsModule } from './rubrics_sections/rubrics_sections.module';
import { SectionsParametersModule } from './sections_parameters/sections_parameters.module';
import { CertificatesModule } from './certificates/certificates.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), // Configura el módulo de configuración
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfig, // Usa la función de configuración
      inject: [ConfigService], // Inyecta el ConfigService
    }),
    RolesModule,
    UsersModule,
    AuthModule,
    EventsModule,
    TeamsModule,
    UsersTeamEventModule,
    DepartamentModule,
    MunicipalityModule,
    DocumentTypeModule,
    EventEvaluatorModule,
    EvaluatorQualificationModule,
    RubricsModule,
    RubricsSectionsModule,
    SectionsParametersModule,
    CertificatesModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}