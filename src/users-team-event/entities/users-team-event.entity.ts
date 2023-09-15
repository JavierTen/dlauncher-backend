import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Users } from "src/users/entities/user.entity";
import { Teams } from "src/teams/entities/team.entity";

@Entity()
export class UsersTeamsEvents {
    @PrimaryGeneratedColumn()
    id: number; // Columna de clave primaria generada automáticamente

    @Column({ default: false })
    rol: boolean; // Columna de clave primaria generada automáticamente

    @ManyToOne(() => Users) // Establece la relación muchos a uno con la entidad Usuarios
    @JoinColumn({ name: 'userId' }) // Nombre de la columna en la tabla RegistroEquipos que guarda la FK
    user: Users; // Nombre de la propiedad en la entidad RegistroEquipos para acceder al usuario relacionado

    @ManyToOne(() => Teams) // Establece la relación muchos a uno con la entidad Equipos
    @JoinColumn({ name: 'teamId' }) // Nombre de la columna en la tabla RegistroEquipos que guarda la FK
    team: Teams; // Nombre de la propiedad en la entidad RegistroEquipos para acceder al equipo relacionado
    

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date; // Columna para almacenar la fecha y hora de actualización automáticamente



}
