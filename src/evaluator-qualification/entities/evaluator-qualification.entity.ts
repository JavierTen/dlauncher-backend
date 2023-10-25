import { Events } from "src/events/entities/event.entity";
import { Teams } from "src/teams/entities/team.entity";
import { Users } from "src/users/entities/user.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, getRepository } from "typeorm";

@Entity()
export class EvaluatorQualification {
    @PrimaryGeneratedColumn()
    id: number; // Columna de clave primaria generada automáticamente

    @ManyToOne(() => Teams, { eager: true }) // Establece la relación muchos a uno con la entidad Eventos
    @JoinColumn({ name: 'teamId' }) // Nombre de la columna en la tabla Equipos que guarda la FK
    team: Teams;

    @ManyToOne(() => Users, { eager: true }) // Establece la relación muchos a uno con la entidad Usuarios
    @JoinColumn({ name: 'userId' }) // Nombre de la columna en la tabla RegistroEquipos que guarda la FK
    user: Users; // Nombre de la propiedad en la entidad RegistroEquipos para acceder al usuario relacionado

    @ManyToOne(() => Events, { eager: true }) // Establece la relación muchos a uno con la entidad Usuarios
    @JoinColumn({ name: 'eventId' }) // Nombre de la columna en la tabla RegistroEquipos que guarda la FK
    event: Events; // Nombre de la propiedad en la entidad RegistroEquipos para acceder al usuario relacionado

    @Column({ type: 'double precision' })
    score: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date; // Columna para almacenar la fecha y hora de creación, con valor por defecto actual

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date; // Columna para almacenar la fecha y hora de actualización automáticamente
}
